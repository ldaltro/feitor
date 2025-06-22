#!/usr/bin/env node

const bcrypt = require('bcryptjs');

async function setupAdmin() {
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (!adminPassword) {
    console.error('❌ ADMIN_PASSWORD environment variable is required');
    console.log('Usage: ADMIN_PASSWORD=yourpassword node scripts/setup-admin.js');
    process.exit(1);
  }

  // Generate hash
  const hash = await bcrypt.hash(adminPassword, 12);
  
  console.log('Generated password hash:');
  console.log(hash);
  console.log('\nTo update the admin user password, run:');
  console.log(`psql $DATABASE_URL -c "UPDATE \\"User\\" SET password = '${hash}' WHERE username = 'gustavo';"`);
}

setupAdmin().catch(console.error);