// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title SSIProtocol
 * @dev Autonomous standard for Solvency Standardized Indexes on ValueChain.
 * Receives index publishing commands from the NarrativeForge agent.
 */
contract SSIProtocol {
    struct IndexComposition {
        string name;
        string[] symbols;
        uint256[] weights; // in basis points (10000 = 100%)
        address publisher;
        uint256 timestamp;
    }

    mapping(bytes32 => IndexComposition) public indexes;
    bytes32[] public allIndexIds;

    event IndexPublished(
        bytes32 indexed indexId,
        string name,
        address indexed publisher,
        uint256 timestamp
    );

    /**
     * @notice Publishes a new SSI index composition.
     * @param _name The name/theme of the index (e.g., "AI Season")
     * @param _symbols The array of token symbols
     * @param _weights The array of token weights in basis points
     */
    function publishIndex(
        string memory _name,
        string[] memory _symbols,
        uint256[] memory _weights
    ) external returns (bytes32) {
        require(_symbols.length > 0, "SSI: Must provide at least one token");
        require(_symbols.length == _weights.length, "SSI: Symbols and weights length mismatch");
        
        uint256 totalWeight = 0;
        for(uint i = 0; i < _weights.length; i++) {
            totalWeight += _weights[i];
        }
        require(totalWeight == 10000, "SSI: Total weight must exactly equal 10000 basis points");

        bytes32 indexId = keccak256(abi.encodePacked(_name, block.timestamp, msg.sender));
        
        indexes[indexId] = IndexComposition({
            name: _name,
            symbols: _symbols,
            weights: _weights,
            publisher: msg.sender,
            timestamp: block.timestamp
        });
        
        allIndexIds.push(indexId);

        emit IndexPublished(indexId, _name, msg.sender, block.timestamp);
        
        return indexId;
    }
    
    function getIndex(bytes32 _indexId) external view returns (IndexComposition memory) {
        return indexes[_indexId];
    }
}
