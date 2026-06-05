---
sidebar_position: 2
---

# Mainnet Strategy

Moving from Sepolia Testnet to Ethereum Mainnet requires careful planning to manage gas costs and ensure institutional-grade security.

## Multi-Chain Architecture

The frontend is already configured via Wagmi (`main.tsx`) to support `mainnet`. Switching the platform to mainnet is as simple as:
1. Re-running the `scripts/deploy_ssi.py` script while targeting the Ethereum Mainnet RPC URL.
2. Updating the `SSI_PROTOCOL_ADDRESS` environment variable to the new Mainnet address.
3. Updating the `chainId` in the `Dashboard.tsx` `useWriteContract` block from `11155111` (Sepolia) to `1` (Mainnet).

## Gas Cost Considerations

Because the `publishIndex` function requires writing arrays of strings and integers to the Ethereum blockchain, gas costs on Mainnet can be prohibitively high during peak congestion. 
Future iterations of the SSI Protocol will likely implement **L2 scaling solutions** (e.g., Arbitrum, Optimism, or Base) to ensure that the AI Oracle can publish new narratives frequently without bankrupting the user in gas fees.
