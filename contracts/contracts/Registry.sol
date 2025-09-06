// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./CarbonCredit.sol";
import "./CreditBatch.sol";

/**
 * @title Registry
 * @dev Central registry linking projects, batches, and credits
 */
contract Registry is AccessControl, Pausable {
    bytes32 public constant REGISTRY_ADMIN_ROLE = keccak256("REGISTRY_ADMIN_ROLE");
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");

    CarbonCredit public immutable carbonCredit;
    CreditBatch public immutable creditBatch;

    // Project information
    struct Project {
        string name;
        address owner;
        string description;
        string country;
        string metadataCID;
        bool active;
        uint256 createdAt;
    }

    // Plot information
    struct Plot {
        uint256 projectId;
        string geojsonCID;
        uint256 areaHa; // Area in hectares (scaled by 1e18)
        string[] species;
        uint256 datePlanted;
        uint256 baselineCarbonTonnes;
        bool active;
        uint256 createdAt;
    }

    mapping(uint256 => Project) public projects;
    mapping(uint256 => Plot) public plots;
    mapping(uint256 => uint256[]) public projectPlots; // projectId => plotIds[]
    mapping(uint256 => uint256) public batchToCredits; // batchTokenId => creditAmount

    uint256 private _projectIdCounter;
    uint256 private _plotIdCounter;

    // Events
    event ProjectCreated(
        uint256 indexed projectId,
        string name,
        address indexed owner,
        string country,
        string metadataCID
    );

    event PlotCreated(
        uint256 indexed plotId,
        uint256 indexed projectId,
        uint256 areaHa,
        uint256 datePlanted
    );

    event BatchLinkedToCredits(
        uint256 indexed batchTokenId,
        uint256 indexed projectId,
        uint256 creditAmount
    );

    constructor(
        address defaultAdmin,
        address _carbonCredit,
        address _creditBatch
    ) {
        require(_carbonCredit != address(0), "Invalid carbon credit address");
        require(_creditBatch != address(0), "Invalid credit batch address");

        carbonCredit = CarbonCredit(_carbonCredit);
        creditBatch = CreditBatch(_creditBatch);

        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(REGISTRY_ADMIN_ROLE, defaultAdmin);
        _grantRole(VERIFIER_ROLE, defaultAdmin);
    }

    /**
     * @dev Create a new project
     */
    function createProject(
        string memory name,
        address owner,
        string memory description,
        string memory country,
        string memory metadataCID
    ) public onlyRole(REGISTRY_ADMIN_ROLE) whenNotPaused returns (uint256) {
        require(owner != address(0), "Invalid owner address");
        require(bytes(name).length > 0, "Project name cannot be empty");
        require(bytes(country).length > 0, "Country cannot be empty");

        uint256 projectId = _projectIdCounter++;

        projects[projectId] = Project({
            name: name,
            owner: owner,
            description: description,
            country: country,
            metadataCID: metadataCID,
            active: true,
            createdAt: block.timestamp
        });

        emit ProjectCreated(projectId, name, owner, country, metadataCID);
        return projectId;
    }

    /**
     * @dev Create a new plot within a project
     */
    function createPlot(
        uint256 projectId,
        string memory geojsonCID,
        uint256 areaHa,
        string[] memory species,
        uint256 datePlanted,
        uint256 baselineCarbonTonnes
    ) public onlyRole(REGISTRY_ADMIN_ROLE) whenNotPaused returns (uint256) {
        require(projects[projectId].active, "Project does not exist or is inactive");
        require(bytes(geojsonCID).length > 0, "Geojson CID cannot be empty");
        require(areaHa > 0, "Area must be greater than 0");

        uint256 plotId = _plotIdCounter++;

        plots[plotId] = Plot({
            projectId: projectId,
            geojsonCID: geojsonCID,
            areaHa: areaHa,
            species: species,
            datePlanted: datePlanted,
            baselineCarbonTonnes: baselineCarbonTonnes,
            active: true,
            createdAt: block.timestamp
        });

        projectPlots[projectId].push(plotId);

        emit PlotCreated(plotId, projectId, areaHa, datePlanted);
        return plotId;
    }

    /**
     * @dev Link a verified batch to minted credits
     */
    function linkBatchToCredits(
        uint256 batchTokenId,
        uint256 creditAmount
    ) public onlyRole(VERIFIER_ROLE) whenNotPaused {
        require(creditBatch.ownerOf(batchTokenId) != address(0), "Batch does not exist");
        
        CreditBatch.BatchInfo memory batchInfo = creditBatch.getBatchInfo(batchTokenId);
        require(batchInfo.verified, "Batch must be verified");
        require(batchToCredits[batchTokenId] == 0, "Batch already linked to credits");
        require(creditAmount > 0, "Credit amount must be greater than 0");

        batchToCredits[batchTokenId] = creditAmount;

        emit BatchLinkedToCredits(batchTokenId, batchInfo.projectId, creditAmount);
    }

    /**
     * @dev Get project plots
     */
    function getProjectPlots(uint256 projectId) public view returns (uint256[] memory) {
        return projectPlots[projectId];
    }

    /**
     * @dev Get linked credit amount for a batch
     */
    function getBatchCredits(uint256 batchTokenId) public view returns (uint256) {
        return batchToCredits[batchTokenId];
    }

    /**
     * @dev Get total projects count
     */
    function totalProjects() public view returns (uint256) {
        return _projectIdCounter;
    }

    /**
     * @dev Get total plots count
     */
    function totalPlots() public view returns (uint256) {
        return _plotIdCounter;
    }

    /**
     * @dev Pause contract
     */
    function pause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    /**
     * @dev Unpause contract
     */
    function unpause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}