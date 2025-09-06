import { expect } from "chai";
import { ethers } from "hardhat";
import { CarbonCredit } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("CarbonCredit", function () {
  let carbonCredit: CarbonCredit;
  let owner: SignerWithAddress;
  let minter: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;

  beforeEach(async function () {
    [owner, minter, user1, user2] = await ethers.getSigners();

    const CarbonCredit = await ethers.getContractFactory("CarbonCredit");
    carbonCredit = await CarbonCredit.deploy(owner.address);
    await carbonCredit.waitForDeployment();

    // Grant minter role
    const MINTER_ROLE = await carbonCredit.MINTER_ROLE();
    await carbonCredit.grantRole(MINTER_ROLE, minter.address);
  });

  describe("Deployment", function () {
    it("Should set the right name and symbol", async function () {
      expect(await carbonCredit.name()).to.equal("Blue Carbon Credit");
      expect(await carbonCredit.symbol()).to.equal("BCC");
    });

    it("Should set the right decimals", async function () {
      expect(await carbonCredit.decimals()).to.equal(18);
    });

    it("Should grant admin role to deployer", async function () {
      const DEFAULT_ADMIN_ROLE = await carbonCredit.DEFAULT_ADMIN_ROLE();
      expect(await carbonCredit.hasRole(DEFAULT_ADMIN_ROLE, owner.address)).to.be.true;
    });
  });

  describe("Minting", function () {
    it("Should mint tokens to specified address", async function () {
      const amount = ethers.parseEther("100");
      const batchId = 1;

      await expect(carbonCredit.connect(minter).mint(user1.address, amount, batchId))
        .to.emit(carbonCredit, "CreditsMinted")
        .withArgs(user1.address, amount, batchId);

      expect(await carbonCredit.balanceOf(user1.address)).to.equal(amount);
      expect(await carbonCredit.totalSupply()).to.equal(amount);
    });

    it("Should fail when minting to zero address", async function () {
      const amount = ethers.parseEther("100");
      const batchId = 1;

      await expect(
        carbonCredit.connect(minter).mint(ethers.ZeroAddress, amount, batchId)
      ).to.be.revertedWith("Cannot mint to zero address");
    });

    it("Should fail when non-minter tries to mint", async function () {
      const amount = ethers.parseEther("100");
      const batchId = 1;

      await expect(
        carbonCredit.connect(user1).mint(user2.address, amount, batchId)
      ).to.be.reverted;
    });

    it("Should respect max supply cap", async function () {
      const maxSupply = await carbonCredit.MAX_SUPPLY();
      const amount = maxSupply + ethers.parseEther("1");
      const batchId = 1;

      await expect(
        carbonCredit.connect(minter).mint(user1.address, amount, batchId)
      ).to.be.revertedWith("Would exceed max supply");
    });
  });

  describe("Retiring", function () {
    beforeEach(async function () {
      // Mint some tokens first
      const amount = ethers.parseEther("1000");
      const batchId = 1;
      await carbonCredit.connect(minter).mint(user1.address, amount, batchId);
    });

    it("Should allow users to retire their own tokens", async function () {
      const retireAmount = ethers.parseEther("100");
      const reason = "Voluntary retirement";

      await expect(carbonCredit.connect(user1).retire(retireAmount, reason))
        .to.emit(carbonCredit, "CreditsRetired")
        .withArgs(user1.address, retireAmount, reason);

      expect(await carbonCredit.balanceOf(user1.address)).to.equal(
        ethers.parseEther("900")
      );
      expect(await carbonCredit.retiredBalanceOf(user1.address)).to.equal(retireAmount);
      expect(await carbonCredit.totalRetired()).to.equal(retireAmount);
    });

    it("Should fail when retiring more than balance", async function () {
      const retireAmount = ethers.parseEther("2000");
      const reason = "Voluntary retirement";

      await expect(
        carbonCredit.connect(user1).retire(retireAmount, reason)
      ).to.be.revertedWith("Insufficient balance");
    });

    it("Should allow retirer role to retire from any account", async function () {
      const RETIRER_ROLE = await carbonCredit.RETIRER_ROLE();
      await carbonCredit.grantRole(RETIRER_ROLE, owner.address);

      const retireAmount = ethers.parseEther("100");
      const reason = "Mandatory retirement";

      await expect(carbonCredit.connect(owner).retireFrom(user1.address, retireAmount, reason))
        .to.emit(carbonCredit, "CreditsRetired")
        .withArgs(user1.address, retireAmount, reason);

      expect(await carbonCredit.balanceOf(user1.address)).to.equal(
        ethers.parseEther("900")
      );
      expect(await carbonCredit.retiredBalanceOf(user1.address)).to.equal(retireAmount);
    });
  });

  describe("Pausable", function () {
    it("Should pause and unpause", async function () {
      const PAUSER_ROLE = await carbonCredit.PAUSER_ROLE();
      await carbonCredit.grantRole(PAUSER_ROLE, owner.address);

      await carbonCredit.connect(owner).pause();
      expect(await carbonCredit.paused()).to.be.true;

      // Should fail to mint when paused
      const amount = ethers.parseEther("100");
      const batchId = 1;
      await expect(
        carbonCredit.connect(minter).mint(user1.address, amount, batchId)
      ).to.be.reverted;

      await carbonCredit.connect(owner).unpause();
      expect(await carbonCredit.paused()).to.be.false;

      // Should work again after unpause
      await expect(carbonCredit.connect(minter).mint(user1.address, amount, batchId))
        .to.emit(carbonCredit, "CreditsMinted");
    });
  });
});