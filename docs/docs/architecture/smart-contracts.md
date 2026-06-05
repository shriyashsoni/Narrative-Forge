---
sidebar_position: 2
---

# Smart Contracts (SSI Protocol)

The Synthetic Sector Index (SSI) Protocol is the blockchain backbone of the NarrativeForge ecosystem. It is a solidity smart contract deployed on Ethereum that immutably records the composition of the AI-generated indexes.

## Core Contract: `SSIProtocol.sol`

The smart contract acts as an immutable registry. When the AI Oracle decides that a new narrative has formed (e.g., "AI Data Tokens"), it prepares an index composition payload.

### The `publishIndex` Function

To prevent spam and ensure cryptographic verifiability, the AI oracle cannot directly write to the blockchain. Instead, it streams the payload to the frontend Dashboard. The human user must physically sign the transaction using their Web3 wallet.

```solidity
function publishIndex(
    string memory _name,
    string[] memory _symbols,
    uint256[] memory _weights
) external returns (bytes32 indexId) {
    require(_symbols.length == _weights.length, "SSI: Array length mismatch");
    
    uint256 totalWeight = 0;
    for(uint i = 0; i < _weights.length; i++) {
        totalWeight += _weights[i];
    }
    
    // Critical Math Enforcement
    require(totalWeight == 10000, "SSI: Total weight must exactly equal 10000 basis points");

    indexId = keccak256(abi.encodePacked(_name, block.timestamp, msg.sender));
    
    Index storage newIndex = indexes[indexId];
    newIndex.name = _name;
    newIndex.publisher = msg.sender;
    newIndex.timestamp = block.timestamp;
    newIndex.active = true;

    for(uint i = 0; i < _symbols.length; i++) {
        newIndex.symbols.push(_symbols[i]);
        newIndex.weights.push(_weights[i]);
    }

    emit IndexPublished(indexId, _name, msg.sender);
    return indexId;
}
```

### Event Emittance

Upon successful publication, the contract emits an `IndexPublished` event. The platform's frontend hooks into this event receipt via Wagmi/viem to instantly generate an Etherscan block explorer link, verifying the operation occurred completely on-chain.
