#!/bin/bash

# Blue Carbon MRV & Registry - Mumbai Testnet Deployment Script

set -e

echo "🚀 Deploying Blue Carbon contracts to Polygon Mumbai Testnet..."

# Check if required environment variables are set
if [ -z "$ALCHEMY_API_KEY" ]; then
    echo "❌ ALCHEMY_API_KEY is not set in environment"
    exit 1
fi

if [ -z "$DEPLOYER_PRIVATE_KEY" ]; then
    echo "❌ DEPLOYER_PRIVATE_KEY is not set in environment"
    exit 1
fi

# Change to contracts directory
cd contracts

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing contract dependencies..."
    npm install
fi

# Compile contracts
echo "🔨 Compiling smart contracts..."
npx hardhat compile

# Run tests first
echo "🧪 Running contract tests..."
npx hardhat test

# Deploy to Mumbai testnet
echo "📝 Deploying contracts to Mumbai testnet..."
npx hardhat run scripts/deploy.ts --network mumbai

# Verify contracts on Polygonscan (if API key is provided)
if [ ! -z "$POLYGONSCAN_API_KEY" ]; then
    echo "🔍 Verifying contracts on Polygonscan..."
    # Note: This would need the actual contract addresses from deployment
    echo "⚠️  Please manually verify contracts using the deployment output"
else
    echo "⚠️  POLYGONSCAN_API_KEY not set, skipping contract verification"
fi

echo ""
echo "✅ Mumbai deployment completed!"
echo ""
echo "📋 Next steps:"
echo "   1. Update backend/.env with new contract addresses"
echo "   2. Update frontend environment with Mumbai network details"
echo "   3. Test the deployment with frontend integration"
echo "   4. Consider setting up monitoring and alerts"
echo ""
echo "🔗 Useful links:"
echo "   Mumbai Explorer: https://mumbai.polygonscan.com/"
echo "   Mumbai Faucet:   https://faucet.polygon.technology/"
echo "   Gas Tracker:     https://gasstation-mumbai.matic.today/"
echo ""