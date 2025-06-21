const { PrismaClient } = require('../lib/generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('🔍 Testando conexão com Supabase...');
    
    // Test connection
    await prisma.$connect();
    console.log('✅ Conectado ao Supabase com sucesso!');
    
    // Check if tables exist by listing them
    console.log('📋 Verificando se as tabelas existem...');
    
    try {
      const farmCount = await prisma.farm.count();
      console.log(`✅ Tabela Farm encontrada - ${farmCount} registros`);
    } catch (error) {
      console.log('❌ Tabela Farm não existe, criando...');
      
      // If tables don't exist, we need to run migrations
      console.log('🚀 Executando push do schema...');
      const { execSync } = require('child_process');
      execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' });
    }
    
    // Create farm if it doesn't exist
    let farm = await prisma.farm.findFirst({
      where: { name: 'Fazenda Vista Alegre' }
    });
    
    if (!farm) {
      console.log('🏭 Criando fazenda...');
      farm = await prisma.farm.create({
        data: {
          name: 'Fazenda Vista Alegre',
          address: 'Estrada Municipal km 12, Zona Rural',
          phone: '(11) 98765-4321',
          active: true,
        },
      });
      console.log(`✅ Fazenda criada: ${farm.name}`);
    } else {
      console.log(`✅ Fazenda já existe: ${farm.name}`);
    }
    
    // Create user if it doesn't exist
    let user = await prisma.user.findFirst({
      where: { username: 'gustavo' }
    });
    
    if (!user) {
      console.log('👤 Criando usuário admin...');
      const hashedPassword = await bcrypt.hash('ForteCavalo89@', 10);
      
      user = await prisma.user.create({
        data: {
          username: 'gustavo',
          email: 'gustavo@fazendavistaalegre.com.br',
          password: hashedPassword,
          fullName: 'Gustavo Silva',
          role: 'ADMIN',
          farmId: farm.id,
          active: true,
        },
      });
      console.log(`✅ Usuário admin criado: ${user.username}`);
    } else {
      console.log(`✅ Usuário admin já existe: ${user.username}`);
    }
    
    console.log('\n🎉 Setup concluído com sucesso!');
    console.log('📱 Login:');
    console.log(`   Usuário: ${user.username}`);
    console.log(`   Senha: ForteCavalo89@`);
    console.log(`   Email: ${user.email}`);
    
  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();