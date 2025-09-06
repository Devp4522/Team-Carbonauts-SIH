// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title CarbonCredit
 * @dev ERC20 token representing carbon credits (1 token = 1 tonne CO2e)
 */
contract CarbonCredit is ERC20, AccessControl, Pausable {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant RETIRER_ROLE = keccak256("RETIRER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    // Total supply cap
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10**18; // 1 billion tokens

    // Retired tokens tracking
    mapping(address => uint256) private _retiredBalances;
    uint256 private _totalRetired;

    // Events
    event CreditsMinted(address indexed to, uint256 amount, uint256 indexed batchId);
    event CreditsRetired(address indexed from, uint256 amount, string reason);

    constructor(address defaultAdmin) ERC20("Blue Carbon Credit", "BCC") {
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(MINTER_ROLE, defaultAdmin);
        _grantRole(RETIRER_ROLE, defaultAdmin);
        _grantRole(PAUSER_ROLE, defaultAdmin);
    }

    /**
     * @dev Mint new carbon credits to specified address
     * @param to Address to mint tokens to
     * @param amount Amount of tokens to mint
     * @param batchId Associated batch ID for tracking
     */
    function mint(address to, uint256 amount, uint256 batchId) 
        public 
        onlyRole(MINTER_ROLE) 
        whenNotPaused 
    {
        require(to != address(0), "Cannot mint to zero address");
        require(amount > 0, "Amount must be greater than 0");
        require(totalSupply() + amount <= MAX_SUPPLY, "Would exceed max supply");

        _mint(to, amount);
        emit CreditsMinted(to, amount, batchId);
    }

    /**
     * @dev Retire carbon credits (permanently remove from circulation)
     * @param amount Amount of tokens to retire
     * @param reason Reason for retirement
     */
    function retire(uint256 amount, string memory reason) public whenNotPaused {
        require(amount > 0, "Amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");

        _burn(msg.sender, amount);
        _retiredBalances[msg.sender] += amount;
        _totalRetired += amount;

        emit CreditsRetired(msg.sender, amount, reason);
    }

    /**
     * @dev Retire credits on behalf of another account (requires approval)
     * @param from Address to retire credits from
     * @param amount Amount to retire
     * @param reason Reason for retirement
     */
    function retireFrom(address from, uint256 amount, string memory reason) 
        public 
        onlyRole(RETIRER_ROLE) 
        whenNotPaused 
    {
        require(amount > 0, "Amount must be greater than 0");
        require(balanceOf(from) >= amount, "Insufficient balance");

        _burn(from, amount);
        _retiredBalances[from] += amount;
        _totalRetired += amount;

        emit CreditsRetired(from, amount, reason);
    }

    /**
     * @dev Get retired balance for an address
     */
    function retiredBalanceOf(address account) public view returns (uint256) {
        return _retiredBalances[account];
    }

    /**
     * @dev Get total retired tokens
     */
    function totalRetired() public view returns (uint256) {
        return _totalRetired;
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
     * @dev Override to add pause functionality to transfers
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
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