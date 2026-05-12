import os
from web3 import Web3
from typing import List, Dict, Any

class BlockchainClient:
    def __init__(self, rpc_url: str, private_key: str):
        self.w3 = Web3(Web3.HTTPProvider(rpc_url))
        self.account = None
        try:
            if private_key and len(private_key) >= 64:
                self.account = self.w3.eth.account.from_key(private_key)
        except Exception as e:
            print(f"Blockchain Client Warning: Invalid private key provided. Execution disabled. {e}")
        
        # Placeholder for SSI Protocol ABI & Address
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
        """Publishes an index composition to the SSI Protocol on ValueChain."""
        if not self.account or self.ssi_address == "0x0000000000000000000000000000000000000000":
            return {"status": "mock", "tx_hash": "0xMOCK_TX_HASH", "msg": "Execution disabled or no contract set."}

        contract = self.w3.eth.contract(address=self.ssi_address, abi=self.ssi_abi)
        
        symbols = [c["symbol"] for c in composition]
        weights = [int(c["weight"] * 100) for c in composition] # Convert to basis points
        
        nonce = self.w3.eth.get_transaction_count(self.account.address)
        
        tx = contract.functions.publishIndex(name, symbols, weights).build_transaction({
            'chainId': self.w3.eth.chain_id,
            'gas': 2000000,
            'gasPrice': self.w3.eth.gas_price,
            'nonce': nonce,
        })
        
        signed_tx = self.w3.eth.account.sign_transaction(tx, private_key=self.account.key)
        tx_hash = self.w3.eth.send_raw_transaction(signed_tx.rawTransaction)
        
        return {"status": "success", "tx_hash": tx_hash.hex()}
