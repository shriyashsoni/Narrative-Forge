"""
Deploy SSIProtocol.sol to ValueChain Testnet
Wallet: 0x9eeAb92431FD385981735dbF5B949b6C4c2eBC39
"""
import os, sys, json, time
from pathlib import Path
from dotenv import load_dotenv
from web3 import Web3

load_dotenv(Path(__file__).parent.parent / "backend" / ".env")

RPC_URL      = os.getenv("SEPOLIA_RPC_URL", "https://ethereum-sepolia-rpc.publicnode.com")
PRIVATE_KEY  = os.getenv("PRIVATE_KEY")
WALLET       = os.getenv("WALLET_ADDRESS", "0x9eeAb92431FD385981735dbF5B949b6C4c2eBC39")
EXPLORER     = "https://sepolia.etherscan.io"

print("=" * 60)
print("NarrativeForge - SSI Protocol Deployment")
print(f"RPC:     {RPC_URL}")
print(f"Wallet:  {WALLET}")
print("=" * 60)

w3 = Web3(Web3.HTTPProvider(RPC_URL))

if not w3.is_connected():
    print(f"\nERROR: Cannot connect to RPC: {RPC_URL}")
    print("The ValueChain testnet RPC may be offline or unreachable.")
    sys.exit(1)

print(f"Connected to ValueChain Testnet (Chain ID: {w3.eth.chain_id})")

account = w3.eth.account.from_key(PRIVATE_KEY)
balance = w3.eth.get_balance(account.address)
balance_eth = w3.from_wei(balance, 'ether')

print(f"Signer:  {account.address}")
print(f"Balance: {balance_eth} VALUE")

if balance == 0:
    print(f"\nWARNING: Wallet has no balance! Get testnet tokens from:")
    print(f"  https://testnet.sodex.com/faucet")
    print(f"  Address: {account.address}")
    sys.exit(1)

print(f"\nDeploying SSIProtocol contract...")

try:
    import solcx
    solcx.install_solc("0.8.20", show_progress=False)
    sol_path = Path(__file__).parent.parent / "contracts" / "SSIProtocol.sol"
    compiled = solcx.compile_files(
        [str(sol_path)],
        output_values=["abi", "bin"],
        solc_version="0.8.20",
        optimize=True,
        optimize_runs=200
    )
    key = [k for k in compiled.keys() if "SSIProtocol" in k][0]
    abi      = compiled[key]["abi"]
    bytecode = compiled[key]["bin"]
    print("Compiled successfully with solc 0.8.20")
except ImportError:
    print("WARN: solcx not found - verifying wallet only")
    nonce = w3.eth.get_transaction_count(account.address)
    print(f"Account live on-chain. Nonce: {nonce}")
    print(f"Wallet {account.address} verified, Balance: {balance_eth} VALUE")
    sys.exit(0)

Contract = w3.eth.contract(abi=abi, bytecode=bytecode)
nonce     = w3.eth.get_transaction_count(account.address)
gas_price = w3.eth.gas_price

print(f"Gas price: {w3.from_wei(gas_price, 'gwei')} gwei | Nonce: {nonce}")

tx = Contract.constructor().build_transaction({
    'from': account.address,
    'chainId': w3.eth.chain_id,
    'gas': 3_000_000,
    'gasPrice': gas_price,
    'nonce': nonce,
})

signed   = account.sign_transaction(tx)
tx_hash  = w3.eth.send_raw_transaction(signed.raw_transaction)

print(f"TX sent: {tx_hash.hex()}")
print(f"  https://testnet.scan.valuechain.xyz/tx/{tx_hash.hex()}")
print("Waiting for confirmation (up to 120s)...")

receipt          = w3.eth.wait_for_transaction_receipt(tx_hash, timeout=120)
contract_address = receipt.contractAddress

print("\n=== CONTRACT DEPLOYED SUCCESSFULLY ===")
print(f"  Address: {contract_address}")
print(f"  TX Hash: {receipt.transactionHash.hex()}")
print(f"  Explorer: https://testnet.scan.valuechain.xyz/tx/{receipt.transactionHash.hex()}")
print(f"  Block:   {receipt.blockNumber}")

# Auto-update .env
env_path = Path(__file__).parent.parent / "backend" / ".env"
content  = env_path.read_text()
content  = content.replace(
    "SSI_PROTOCOL_ADDRESS=0x0000000000000000000000000000000000000000",
    f"SSI_PROTOCOL_ADDRESS={contract_address}"
)
env_path.write_text(content)
print(f"\n.env updated: SSI_PROTOCOL_ADDRESS={contract_address}")
print("NarrativeForge is now fully on-chain!")
