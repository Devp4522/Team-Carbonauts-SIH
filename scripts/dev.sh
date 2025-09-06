#!/bin/bash

# Blue Carbon MRV & Registry - Development Setup Script

set -e

echo "🌊 Starting Blue Carbon MRV & Registry Development Environment..."

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Create logs directory
mkdir -p backend/logs

# Copy environment files if they don't exist
if [ ! -f .env ]; then
    echo "📋 Copying .env.example to .env..."
    cp .env.example .env
    echo "⚠️  Please update .env with your actual configuration values"
fi

if [ ! -f backend/.env ]; then
    echo "📋 Copying backend/.env.example to backend/.env..."
    cp backend/.env.example backend/.env
    echo "⚠️  Please update backend/.env with your actual configuration values"
fi

# Start infrastructure services first
echo "🚀 Starting infrastructure services (PostgreSQL, IPFS, Redis)..."
docker-compose up -d postgres ipfs redis

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
until docker-compose exec postgres pg_isready -U bluecarbon >/dev/null 2>&1; do
    printf "."
    sleep 1
done
echo " ✅ PostgreSQL is ready!"

# Start Hardhat network
echo "🔗 Starting Hardhat local blockchain..."
docker-compose up -d hardhat

# Wait for Hardhat to be ready
echo "⏳ Waiting for Hardhat network to be ready..."
sleep 5

# Install dependencies if node_modules don't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing root dependencies..."
    npm install
fi

if [ ! -d "contracts/node_modules" ]; then
    echo "📦 Installing contract dependencies..."
    cd contracts && npm install && cd ..
fi

if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

# Run database migrations
echo "🗄️  Running database migrations..."
cd backend
npx prisma migrate dev --name init
npx prisma generate
cd ..

# Deploy contracts to local network
echo "📝 Deploying smart contracts to local network..."
cd contracts
npm run deploy:local
cd ..

# Start backend service
echo "🖥️  Starting backend API..."
docker-compose up -d backend

# Wait for backend to be ready
echo "⏳ Waiting for backend API to be ready..."
until curl -s http://localhost:4000/health >/dev/null 2>&1; do
    printf "."
    sleep 1
done
echo " ✅ Backend API is ready!"

# Run seed data
echo "🌱 Seeding database with sample data..."
cd backend && npm run seed && cd ..

echo ""
echo "🎉 Blue Carbon Development Environment is ready!"
echo ""
echo "📊 Services:"
echo "   Frontend:     http://localhost:5173"
echo "   Backend API:  http://localhost:4000"
echo "   API Docs:     http://localhost:4000/api/docs"
echo "   Database:     localhost:5432 (bluecarbon/password)"
echo "   IPFS:         http://localhost:5001"
echo "   Hardhat:      http://localhost:8545"
echo ""
echo "🛠️  Useful commands:"
echo "   npm run dev              - Start frontend"
echo "   docker-compose logs -f   - View all logs"
echo "   docker-compose down      - Stop all services"
echo "   npm run test            - Run all tests"
echo ""
echo "💡 To start the frontend, run: npm run dev"
echo ""