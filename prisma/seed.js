const { PrismaClient } = require('../lib/generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create farm
  const farm = await prisma.farm.upsert({
    where: { name: 'Fazenda Vista Alegre' },
    update: {},
    create: {
      name: 'Fazenda Vista Alegre',
      address: 'Estrada Municipal km 12, Zona Rural',
      phone: '(11) 98765-4321',
      active: true,
    },
  });

  console.log(`✅ Farm created: ${farm.name}`);

  // Create admin user
  const hashedPassword = await bcrypt.hash('ForteCavalo89@', 10);
  
  const user = await prisma.user.upsert({
    where: { username: 'gustavo' },
    update: {},
    create: {
      username: 'gustavo',
      email: 'gustavo@fazendavistaalegre.com.br',
      password: hashedPassword,
      fullName: 'Gustavo Silva',
      role: 'ADMIN',
      farmId: farm.id,
      active: true,
    },
  });

  console.log(`✅ Admin user created: ${user.username}`);
  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });