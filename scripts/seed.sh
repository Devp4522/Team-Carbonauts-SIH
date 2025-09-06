#!/bin/bash

# Blue Carbon MRV & Registry - Database Seeding Script

set -e

echo "🌱 Seeding Blue Carbon database with sample data..."

# Change to backend directory
cd backend

# Run the Prisma seed script
echo "📊 Running Prisma seed script..."
npx prisma db seed

echo "✅ Database seeding completed!"
echo ""
echo "📋 Sample data created:"
echo "   - 3 Users (Admin, Verifier, Project Owner)"
echo "   - 3 Projects (Mangrove, Seagrass, Salt Marsh)"
echo "   - 5 Plots across projects"
echo "   - 2 Devices for measurements"
echo "   - 10 Sample measurements"
echo "   - 2 Carbon credit batches"
echo ""
echo "🔑 Test credentials:"
echo "   Admin:         0x1234567890123456789012345678901234567890"
echo "   Verifier:      0x2345678901234567890123456789012345678901"
echo "   Project Owner: 0x3456789012345678901234567890123456789012"
echo ""