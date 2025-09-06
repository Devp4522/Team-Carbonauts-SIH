// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title CreditBatch
 * @dev ERC721 NFT representing carbon credit batches with metadata
 */
contract CreditBatch is ERC721URIStorage, AccessControl, Pausable {
    using Counters for Counters.Counter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    Counters.Counter private _tokenIdCounter;

    // Batch information
    struct BatchInfo {
        uint256 projectId;
        uint256 plotId;
        uint256 totalTonnes;
        string metadataCID;
        bool verified;
        address verifier;
        string verificationReportCID;
        uint256 createdAt;
        uint256 verifiedAt;
    }

    mapping(uint256 => BatchInfo) public batches;

    // Events
    event BatchCreated(
        uint256 indexed tokenId,
        uint256 indexed projectId,
        uint256 indexed plotId,
        address owner,
        uint256 totalTonnes,
        string metadataCID
    );

    event BatchVerified(
        uint256 indexed tokenId,
        address indexed verifier,
        string verificationReportCID,
        uint256 verifiedAt
    );

    constructor(address defaultAdmin) ERC721("Blue Carbon Batch", "BCB") {
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(MINTER_ROLE, defaultAdmin);
        _grantRole(VERIFIER_ROLE, defaultAdmin);
        _grantRole(PAUSER_ROLE, defaultAdmin);
    }

    /**
     * @dev Create a new carbon credit batch
     * @param to Address to mint the batch NFT to
     * @param projectId ID of the associated project
     * @param plotId ID of the associated plot
     * @param totalTonnes Total carbon tonnes in this batch
     * @param metadataCID IPFS CID containing batch metadata
     */
    function createBatch(
        address to,
        uint256 projectId,
        uint256 plotId,
        uint256 totalTonnes,
        string memory metadataCID
    ) public onlyRole(MINTER_ROLE) whenNotPaused returns (uint256) {
        require(to != address(0), "Cannot mint to zero address");
        require(totalTonnes > 0, "Total tonnes must be greater than 0");
        require(bytes(metadataCID).length > 0, "Metadata CID cannot be empty");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, metadataCID);

        batches[tokenId] = BatchInfo({
            projectId: projectId,
            plotId: plotId,
            totalTonnes: totalTonnes,
            metadataCID: metadataCID,
            verified: false,
            verifier: address(0),
            verificationReportCID: "",
            createdAt: block.timestamp,
            verifiedAt: 0
        });

        emit BatchCreated(tokenId, projectId, plotId, to, totalTonnes, metadataCID);
        return tokenId;
    }

    /**
     * @dev Mark a batch as verified
     * @param tokenId ID of the batch to verify
     * @param verificationReportCID IPFS CID of verification report
     */
    function markVerified(
        uint256 tokenId,
        string memory verificationReportCID
    ) public onlyRole(VERIFIER_ROLE) whenNotPaused {
        require(_exists(tokenId), "Batch does not exist");
        require(!batches[tokenId].verified, "Batch already verified");
        require(bytes(verificationReportCID).length > 0, "Verification report CID cannot be empty");

        batches[tokenId].verified = true;
        batches[tokenId].verifier = msg.sender;
        batches[tokenId].verificationReportCID = verificationReportCID;
        batches[tokenId].verifiedAt = block.timestamp;

        emit BatchVerified(tokenId, msg.sender, verificationReportCID, block.timestamp);
    }

    /**
     * @dev Get batch information
     * @param tokenId ID of the batch
     */
    function getBatchInfo(uint256 tokenId) public view returns (BatchInfo memory) {
        require(_exists(tokenId), "Batch does not exist");
        return batches[tokenId];
    }

    /**
     * @dev Get total number of batches created
     */
    function totalBatches() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    /**
     * @dev Pause contract
     */
    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    /**
     * @dev Unpause contract
     */
    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    /**
     * @dev Override to add pause functionality
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721URIStorage, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}