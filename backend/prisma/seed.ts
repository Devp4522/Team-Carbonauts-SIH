import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create users
  const admin = await prisma.user.create({
    data: {
      walletAddress: '0x1234567890123456789012345678901234567890',
      role: UserRole.ADMIN,
      name: 'System Admin',
      email: 'admin@bluecarbon.org'
    }
  });

  const verifier = await prisma.user.create({
    data: {
      walletAddress: '0x2345678901234567890123456789012345678901',
      role: UserRole.VERIFIER,
      name: 'Carbon Verifier',
      email: 'verifier@bluecarbon.org'
    }
  });

  const projectOwner = await prisma.user.create({
    data: {
      walletAddress: '0x3456789012345678901234567890123456789012',
      role: UserRole.PROJECT_OWNER,
      name: 'Mangrove Conservation NGO',
      email: 'projects@mangrovecare.org'
    }
  });

  // Create projects
  const mangroveProject = await prisma.project.create({
    data: {
      name: 'Sundarbans Mangrove Restoration',
      description: 'Large-scale mangrove restoration in the Sundarbans delta',
      country: 'Bangladesh',
      coordinates: [89.5403, 22.4054],
      ownerId: projectOwner.id
    }
  });

  // Create sample plots and measurements
  const plot1 = await prisma.plot.create({
    data: {
      projectId: mangroveProject.id,
      geojsonCID: 'QmSampleGeojsonCID1',
      areaHa: 10.5,
      plantedSpecies: ['Rhizophora apiculata', 'Avicennia marina'],
      datePlanted: new Date('2023-01-15'),
      baselineCarbonTonnes: 150.5
    }
  });

  console.log('✅ Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });