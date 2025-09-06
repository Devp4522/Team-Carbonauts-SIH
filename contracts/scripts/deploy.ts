import { ethers } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  // Deploy CarbonCredit
  const CarbonCredit = await ethers.getContractFactory("CarbonCredit");
  const carbonCredit = await CarbonCredit.deploy(deployer.address);
  await carbonCredit.waitForDeployment();
  const carbonCreditAddress = await carbonCredit.getAddress();

  console.log("CarbonCredit deployed to:", carbonCreditAddress);

  // Deploy CreditBatch
  const CreditBatch = await ethers.getContractFactory("CreditBatch");
  const creditBatch = await CreditBatch.deploy(deployer.address);
  await creditBatch.waitForDeployment();
  const creditBatchAddress = await creditBatch.getAddress();

  console.log("CreditBatch deployed to:", creditBatchAddress);

  // Deploy Registry
  const Registry = await ethers.getContractFactory("Registry");
  const registry = await Registry.deploy(
    deployer.address,
    carbonCreditAddress,
    creditBatchAddress
  );
  await registry.waitForDeployment();
  const registryAddress = await registry.getAddress();

  console.log("Registry deployed to:", registryAddress);

  // Grant roles
  const MINTER_ROLE = await carbonCredit.MINTER_ROLE();
  const VERIFIER_ROLE = await creditBatch.VERIFIER_ROLE();
  const REGISTRY_VERIFIER_ROLE = await registry.VERIFIER_ROLE();

  // Grant minter role to registry for carbon credits
  await carbonCredit.grantRole(MINTER_ROLE, registryAddress);
  console.log("Granted MINTER_ROLE to Registry for CarbonCredit");

  // Grant verifier role to registry for credit batches
  await creditBatch.grantRole(VERIFIER_ROLE, registryAddress);
  console.log("Granted VERIFIER_ROLE to Registry for CreditBatch");

  // Save deployment info
  const deploymentInfo = {
    network: await ethers.provider.getNetwork(),
    deployer: deployer.address,
    contracts: {
      CarbonCredit: carbonCreditAddress,
      CreditBatch: creditBatchAddress,
      Registry: registryAddress,
    },
    deployedAt: new Date().toISOString(),
  };

  const deploymentsDir = path.join(__dirname, "../deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir);
  }

  const networkName = process.env.HARDHAT_NETWORK || "localhost";
  fs.writeFileSync(
    path.join(deploymentsDir, `${networkName}.json`),
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log(`Deployment info saved to deployments/${networkName}.json`);

  // Save ABIs for frontend
  const abisDir = path.join(__dirname, "../../backend/src/abis");
  if (!fs.existsSync(abisDir)) {
    fs.mkdirSync(abisDir, { recursive: true });
  }

  const CarbonCreditArtifact = await ethers.getContractFactory("CarbonCredit");
  const CreditBatchArtifact = await ethers.getContractFactory("CreditBatch");
  const RegistryArtifact = await ethers.getContractFactory("Registry");

  fs.writeFileSync(
    path.join(abisDir, "CarbonCredit.json"),
    JSON.stringify(CarbonCreditArtifact.interface.formatJson(), null, 2)
  );

  fs.writeFileSync(
    path.join(abisDir, "CreditBatch.json"),
    JSON.stringify(CreditBatchArtifact.interface.formatJson(), null, 2)
  );

  fs.writeFileSync(
    path.join(abisDir, "Registry.json"),
    JSON.stringify(RegistryArtifact.interface.formatJson(), null, 2)
  );

  console.log("ABIs saved to backend/src/abis/");

  console.log("\n--- Deployment Summary ---");
  console.log(`CarbonCredit: ${carbonCreditAddress}`);
  console.log(`CreditBatch: ${creditBatchAddress}`);
  console.log(`Registry: ${registryAddress}`);
  console.log(`Network: ${(await ethers.provider.getNetwork()).name}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});