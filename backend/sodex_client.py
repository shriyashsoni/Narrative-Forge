import os
import json
import time
import httpx
from eth_account.messages import encode_typed_data
from web3 import Web3

class SoDEXClient:
    def __init__(self, private_key: str, api_key_name: str, is_testnet: bool = True):
        self.is_testnet = is_testnet
        self.api_key_name = api_key_name
        self.base_url = "https://testnet-gw.sodex.dev/api/v1" if is_testnet else "https://mainnet-gw.sodex.dev/api/v1"
        self.chain_id = 138565 if is_testnet else 286623
        
        self.w3 = Web3()
        self.account = None
        if private_key and len(private_key) >= 64:
            self.account = self.w3.eth.account.from_key(private_key)

    def _sign_payload(self, action_type: str, domain_name: str, payload_dict: dict, nonce: int) -> str:
        # Compact JSON encoding
        compact_json = json.dumps(payload_dict, separators=(',', ':'))
        payload_hash = self.w3.keccak(text=compact_json)

        structured_data = {
            "types": {
                "EIP712Domain": [
                    {"name": "name", "type": "string"},
                    {"name": "version", "type": "string"},
                    {"name": "chainId", "type": "uint256"},
                    {"name": "verifyingContract", "type": "address"}
                ],
                "ExchangeAction": [
                    {"name": "payloadHash", "type": "bytes32"},
                    {"name": "nonce", "type": "uint64"}
                ]
            },
            "primaryType": "ExchangeAction",
            "domain": {
                "name": domain_name,
                "version": "1",
                "chainId": self.chain_id,
                "verifyingContract": "0x0000000000000000000000000000000000000000"
            },
            "message": {
                "payloadHash": payload_hash.hex(),
                "nonce": nonce
            }
        }

        signable_message = encode_typed_data(full_message=structured_data)
        signed_message = self.w3.eth.account.sign_message(signable_message, private_key=self.account.key)
        
        # Prepend 0x01 to the 65-byte signature
        sig_hex = signed_message.signature.hex()
        if sig_hex.startswith("0x"):
            sig_hex = sig_hex[2:]
        return "0x01" + sig_hex

    async def execute_trade(self, symbol_id: int, quantity: str, is_buy: bool):
        """Execute a market order on SoDEX."""
        if not self.account:
            return {"status": "error", "msg": "No private key configured for SoDEX."}

        nonce = int(time.time() * 1000)
        
        # Create params object
        params = {
            "accountID": 1, # Default placeholder, user must fetch via REST if needed
            "symbolID": symbol_id,
            "orders": [
                {
                    "clOrdID": f"sodex-trade-{nonce}",
                    "modifier": 1,
                    "side": 1 if is_buy else 2,
                    "type": 2, # Market
                    "timeInForce": 3, # IOC
                    "quantity": quantity,
                    "reduceOnly": False,
                    "positionSide": 1
                }
            ]
        }

        payload_dict = {
            "type": "newOrder",
            "params": params
        }

        signature = self._sign_payload("newOrder", "futures", payload_dict, nonce)

        headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-API-Sign": signature,
            "X-API-Nonce": str(nonce)
        }
        
        # Ensure the API Key is sent exactly as specified in the document/env
        if self.api_key_name and self.api_key_name.strip():
            headers["X-API-Key"] = self.api_key_name

        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(
                    f"{self.base_url}/perps/trade/orders",
                    json=params, # the HTTP body uses only `params`
                    headers=headers,
                    timeout=10.0
                )
                
                # If the API key is not registered, it will fail, but we've integrated the API!
                return {
                    "status": "success" if response.status_code == 200 else "failed",
                    "http_status": response.status_code,
                    "response": response.text,
                    "trade_executed": True if response.status_code == 200 else False
                }
            except Exception as e:
                return {"status": "error", "msg": str(e)}

