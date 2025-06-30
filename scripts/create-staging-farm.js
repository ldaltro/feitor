require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('../lib/generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createStagingFarm() {
  try {
    console.log('Creating Staging farm...');
    
    // Create the farm
    const farm = await prisma.farm.create({
      data: {
        name: 'Staging',
        address: 'Farm Staging Environment',
        phone: '(11) 99999-9999',
        active: true,
      },
    });

    console.log('Farm created:', farm.id);

    // Hash the password
    const password = 'fazenda123'; // Memorable in Portuguese
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await prisma.user.create({
      data: {
        username: 'test_user',
        email: 'test@staging.fazenda.com',
        password: hashedPassword,
        fullName: 'Usuário de Teste',
        role: 'OWNER',
        farmId: farm.id,
      },
    });

    console.log('User created:', user.id);
    console.log('✅ Staging farm setup complete!');
    console.log('Username: test_user');
    console.log('Password: fazenda123');
    console.log('Farm: Staging');
    
  } catch (error) {
    console.error('Error creating staging farm:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createStagingFarm();