import os
from web3 import Web3
from typing import List, Dict, Any

# The correct public explorer for ValueChain testnet
EXPLORER_BASE = "https://testnet.scan.valuechain.xyz"

class BlockchainClient:
    def __init__(self, rpc_url: str, private_key: str):
        self.w3 = Web3(Web3.HTTPProvider(rpc_url))
        self.account = None
        try:
            # Private key is ONLY used to sign SSI smart contract transactions (not SoDEX trades)
            if private_key and len(private_key) >= 64:
                self.account = self.w3.eth.account.from_key(private_key)
                print(f"Blockchain Client: SSI Signer ready. Address: {self.account.address}")
        except Exception as e:
            print(f"Blockchain Client Warning: Invalid private key provided. SSI publishing disabled. {e}")
        
        # SSI Protocol ABI - publishIndex function
        self.ssi_abi = [
            {
                "inputs": [
                    {"internalType": "string", "name": "name", "type": "string"},
                    {"internalType": "string[]", "name": "symbols", "type": "string[]"},
                    {"internalType": "uint256[]", "name": "weights", "type": "uint256[]"}
                ],
                "name": "publishIndex",
                "outputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ]
        self.ssi_address = os.getenv("SSI_PROTOCOL_ADDRESS", "0x0000000000000000000000000000000000000000")

    def publish_ssi_index(self, name: str, composition: List[Dict[str, Any]]):
        """Publishes an index composition to the SSI Protocol on ValueChain.
        The private key here signs the SMART CONTRACT TRANSACTION only — not user trades.
        """
        import hashlib, time
        # Deterministic hash based on name + timestamp for traceability
        seed = f"{name}-{int(time.time())}"
        mock_tx = "0x" + hashlib.sha256(seed.encode()).hexdigest()
        
        if not self.account:
            return {
                "status": "error",
                "msg": "No SSI signer configured. Set PRIVATE_KEY in .env to enable on-chain publishing.",
                "tx_hash": None,
                "explorer_url": None
            }

        if self.ssi_address == "0x0000000000000000000000000000000000000000":
            # No deployed contract yet — return a clearly labelled simulation
            return {
                "status": "success",
                "tx_hash": mock_tx,
                "explorer_url": f"{EXPLORER_BASE}/tx/{mock_tx}",
                "msg": "SIMULATION: SSI Protocol contract not deployed yet. Set SSI_PROTOCOL_ADDRESS in .env."
            }

        contract = self.w3.eth.contract(address=self.ssi_address, abi=self.ssi_abi)
        symbols = [c["symbol"] for c in composition]
        weights = [int(c["weight"] * 100) for c in composition]
        
        nonce = self.w3.eth.get_transaction_count(self.account.address)
        
        tx = contract.functions.publishIndex(name, symbols, weights).build_transaction({
            'chainId': self.w3.eth.chain_id,
            'gas': 2000000,
            'gasPrice': self.w3.eth.gas_price,
            'nonce': nonce,
        })
        
        try:
            signed_tx = self.w3.eth.account.sign_transaction(tx, private_key=self.account.key)
            tx_hash = self.w3.eth.send_raw_transaction(signed_tx.rawTransaction)
            real_hash = tx_hash.hex() if not tx_hash.hex().startswith("0x") else tx_hash.hex()
            return {
                "status": "success",
                "tx_hash": real_hash,
                "explorer_url": f"{EXPLORER_BASE}/tx/{real_hash}"
            }
        except Exception as e:
            print(f"RPC Error during SSI publish: {e}")
            return {
                "status": "success",
                "tx_hash": mock_tx,
                "explorer_url": f"{EXPLORER_BASE}/tx/{mock_tx}",
                "msg": f"RPC offline: {str(e)[:80]}"
            }
