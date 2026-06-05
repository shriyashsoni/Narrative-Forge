import os
import json
import time
import httpx
import asyncio
from eth_account import Account
from eth_account.messages import encode_typed_data
from web3 import Web3
from dotenv import load_dotenv

# Load the Master Wallet from .env
load_dotenv(os.path.join(os.path.dirname(__file__), '../backend/.env'))

MASTER_PRIVATE_KEY = os.getenv("PRIVATE_KEY")
if not MASTER_PRIVATE_KEY:
    print("Error: No PRIVATE_KEY found in backend/.env")
    exit(1)

w3 = Web3()
master_account = w3.eth.account.from_key(MASTER_PRIVATE_KEY)
print(f"Master Wallet Address: {master_account.address}")

async def generate_and_register_api_key():
    # 1. Generate a new EVM keypair to act as the API Key
    new_api_key_account = Account.create()
    api_key_name = f"narrative-forge-{int(time.time())}"
    
    print(f"Generated New API Key Name: {api_key_name}")
    print(f"Generated New API Key Address (publicKey): {new_api_key_account.address}")
    print(f"Generated New API Key Private Key: {new_api_key_account.key.hex()}")

    # 2. Prepare the addAPIKey payload
    nonce = int(time.time() * 1000)
    
    params = {
        "name": api_key_name,
        "publicKey": new_api_key_account.address
    }
    
    payload_dict = {
        "type": "addAPIKey",
        "params": params
    }
    
    compact_json = json.dumps(payload_dict, separators=(',', ':'))
    payload_hash = w3.keccak(text=compact_json)

    # Note: Documentation says to use the same domain logic. Let's use spot for account actions or futures? 
    # Actually, API keys are global, but let's register on perps.
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
            "name": "futures",
            "version": "1",
            "chainId": 138565, # Testnet
            "verifyingContract": "0x0000000000000000000000000000000000000000"
        },
        "message": {
            "payloadHash": payload_hash.hex(),
            "nonce": nonce
        }
    }

    # 3. Sign with MASTER WALLET for addAPIKey
    signable_message = encode_typed_data(full_message=structured_data)
    signed_message = w3.eth.account.sign_message(signable_message, private_key=master_account.key)
    
    sig_hex = signed_message.signature.hex()
    if sig_hex.startswith("0x"):
        sig_hex = sig_hex[2:]
    typed_signature = "0x01" + sig_hex

    # 4. Send the request
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        # NO X-API-Key header because we are signing with master wallet
        "X-API-Sign": typed_signature,
        "X-API-Nonce": str(nonce)
    }

    base_url = "https://testnet-gw.sodex.dev/api/v1"
    
    async with httpx.AsyncClient() as client:
        print("\nSending registration request to SoDEX...")
        response = await client.post(
            f"{base_url}/perps/action",  # Action endpoint for account changes
            json=params, 
            headers=headers,
            timeout=10.0
        )
        
        print(f"HTTP Status: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            print("\n✅ API Key Successfully Registered!")
            print("Please update your backend/.env file with the following:\n")
            print(f"SODEX_API_KEY_NAME={api_key_name}")
            print(f"SODEX_API_PRIVATE_KEY={new_api_key_account.key.hex()}")
        else:
            print("\n❌ Failed to register API key. The response might indicate an invalid endpoint or signature.")

if __name__ == "__main__":
    asyncio.run(generate_and_register_api_key())
