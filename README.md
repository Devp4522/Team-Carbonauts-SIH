# Blue Carbon MRV & Registry

A complete blockchain-based Blue Carbon Monitoring, Reporting & Verification (MRV) system with tokenized carbon credits.

## 🚀 Quick Start

```bash
# Clone and setup
git clone <repository-url>
cd blue-carbon-mrv-registry

# One-command development environment
chmod +x scripts/dev.sh
./scripts/dev.sh

# Start frontend
npm run dev
```

## 🏗️ Architecture

- **Smart Contracts**: Solidity (ERC-20 Carbon Credits + ERC-721 Batch NFTs)
- **Backend**: Node.js + TypeScript + Express + Prisma + PostgreSQL
- **Frontend**: React + TypeScript + Tailwind CSS
- **Blockchain**: Hardhat (local) + Polygon Mumbai (testnet)
- **Storage**: IPFS for metadata and files

## 📋 Services

- Frontend: http://localhost:5173
- Backend API: http://localhost:4000
- API Docs: http://localhost:4000/api/docs
- Database: localhost:5432
- IPFS: http://localhost:5001
- Hardhat: http://localhost:8545

## 🧪 Testing

```bash
# Run all tests
npm run test

# Contract tests only
cd contracts && npx hardhat test

# Backend tests only
cd backend && npm run test
```

## 🚀 Deployment

```bash
# Deploy to Mumbai testnet
chmod +x scripts/deploy-mumbai.sh
./scripts/deploy-mumbai.sh
```

## 📚 Documentation

- API Documentation: http://localhost:4000/api/docs
- Contract ABIs: `backend/src/abis/`
- Database Schema: `backend/prisma/schema.prisma`