const { Client } = require('pg');
require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL;

async function clearDatabase() {
  const client = new Client({
    connectionString: DATABASE_URL,
  });

  try {
    console.log('🔍 Connecting to Supabase...');
    await client.connect();
    console.log('✅ Connected successfully!');

    console.log('🗑️ Dropping all tables...');
    await client.query('DROP TABLE IF EXISTS "EventAnimal" CASCADE;');
    await client.query('DROP TABLE IF EXISTS "Birth" CASCADE;');
    await client.query('DROP TABLE IF EXISTS "Transaction" CASCADE;');
    await client.query('DROP TABLE IF EXISTS "Event" CASCADE;');
    await client.query('DROP TABLE IF EXISTS "Animal" CASCADE;');
    await client.query('DROP TABLE IF EXISTS "Lote" CASCADE;');
    await client.query('DROP TABLE IF EXISTS "User" CASCADE;');
    await client.query('DROP TABLE IF EXISTS "Farm" CASCADE;');
    await client.query('DROP TYPE IF EXISTS "UserRole" CASCADE;');
    await client.query('DROP TABLE IF EXISTS "_prisma_migrations" CASCADE;');

    console.log('✅ All tables dropped successfully!');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.end();
  }
}

clearDatabase();