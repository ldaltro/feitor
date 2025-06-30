// Alternative script to create staging farm via API
const bcrypt = require('bcryptjs');

// Manual SQL script generation
async function generateSQL() {
  const farmId = 'clz' + Math.random().toString(36).substring(2, 15);
  const userId = 'clz' + Math.random().toString(36).substring(2, 15);
  const hashedPassword = await bcrypt.hash('fazenda123', 10);
  
  const sql = `
-- Create Staging Farm
INSERT INTO "Farm" (id, name, address, phone, active, "createdAt", "updatedAt")
VALUES ('${farmId}', 'Staging', 'Farm Staging Environment', '(11) 99999-9999', true, NOW(), NOW());

-- Create test user
INSERT INTO "User" (id, username, email, password, "fullName", role, active, "farmId", "createdAt", "updatedAt")
VALUES ('${userId}', 'test_user', 'test@staging.fazenda.com', '${hashedPassword}', 'Usuário de Teste', 'OWNER', true, '${farmId}', NOW(), NOW());
`;

  console.log('Run this SQL in your database:');
  console.log(sql);
  console.log('\nCredentials:');
  console.log('Username: test_user');
  console.log('Password: fazenda123');
  console.log('Farm: Staging');
}

generateSQL();