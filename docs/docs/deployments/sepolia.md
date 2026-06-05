---
sidebar_position: 1
---

# Sepolia Testnet Deployment

The NarrativeForge protocol is completely verified and actively running on the **Ethereum Sepolia Testnet**.

## Contract Information

- **Contract Name**: `SSIProtocol`
- **Solidity Version**: `^0.8.20`
- **Network**: Sepolia (Chain ID: 11155111)
- **Deployment Address**: `0xCE2979887785d415b407727CDd8f6Ed752AAE335`

## Frontend Integration

The frontend React application uses **Wagmi** and **viem** to interact with this contract. 
By hardcoding `chainId: 11155111` into the `useWriteContract` hook, the dashboard automatically forces MetaMask to prompt the user to switch to the Sepolia network if they are currently on Ethereum Mainnet or a custom RPC. This acts as a critical safety barrier to prevent users from accidentally broadcasting testnet data to unverified Mainnet addresses.
