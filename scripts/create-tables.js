const { Client } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is not set');
  process.exit(1);
}

async function createTables() {
  const client = new Client({
    connectionString: DATABASE_URL,
  });

  try {
    console.log('🔍 Connecting to Supabase...');
    await client.connect();
    console.log('✅ Connected successfully!');

    // Create UserRole enum first
    console.log('📋 Creating UserRole enum...');
    await client.query(`
      DO $$ BEGIN
        CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'OWNER', 'EMPLOYEE');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    // Create Farm table first (no dependencies)
    console.log('📋 Creating Farm table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Farm" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
        "name" VARCHAR(255) NOT NULL,
        "address" TEXT,
        "phone" VARCHAR(20),
        "active" BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Farm_pkey" PRIMARY KEY ("id")
      );
    `);

    // Create User table (depends on Farm)
    console.log('📋 Creating User table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS "User" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
        "username" VARCHAR(50) NOT NULL,
        "email" VARCHAR(255) NOT NULL,
        "password" VARCHAR(255) NOT NULL,
        "fullName" VARCHAR(255) NOT NULL,
        "role" "UserRole" NOT NULL DEFAULT 'EMPLOYEE',
        "active" BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "farmId" TEXT NOT NULL,
        CONSTRAINT "User_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "User_username_key" UNIQUE ("username"),
        CONSTRAINT "User_email_key" UNIQUE ("email"),
        CONSTRAINT "User_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE
      );
    `);

    // Create other tables...
    console.log('📋 Creating remaining tables...');
    
    // Lote table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Lote" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
        "nome" VARCHAR(255) NOT NULL,
        "descricao" TEXT,
        "finalidade" VARCHAR(50) NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "farmId" TEXT NOT NULL,
        CONSTRAINT "Lote_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "Lote_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE
      );
    `);

    // Animal table
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Animal" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
        "name" VARCHAR(255) NOT NULL,
        "tag" VARCHAR(255) NOT NULL,
        "breed" VARCHAR(100) NOT NULL,
        "gender" VARCHAR(10) NOT NULL,
        "birthDate" TIMESTAMP(3) NOT NULL,
        "status" VARCHAR(50) NOT NULL,
        "reproductiveStatus" VARCHAR(50),
        "inseminationDate" TIMESTAMP(3),
        "expectedBirthDate" TIMESTAMP(3),
        "abortionDate" TIMESTAMP(3),
        "weight" DOUBLE PRECISION,
        "notes" TEXT,
        "purchaseDate" TIMESTAMP(3),
        "purchaseValue" DOUBLE PRECISION,
        "active" BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "farmId" TEXT NOT NULL,
        "loteId" TEXT,
        CONSTRAINT "Animal_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "Animal_tag_farmId_key" UNIQUE ("tag", "farmId"),
        CONSTRAINT "Animal_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
        CONSTRAINT "Animal_loteId_fkey" FOREIGN KEY ("loteId") REFERENCES "Lote"("id") ON DELETE SET NULL ON UPDATE CASCADE
      );
    `);

    // Transaction, Event, Birth, EventAnimal tables...
    await client.query(`
      CREATE TABLE IF NOT EXISTS "Transaction" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
        "type" VARCHAR(50) NOT NULL,
        "date" TIMESTAMP(3) NOT NULL,
        "value" DOUBLE PRECISION NOT NULL,
        "person" VARCHAR(255) NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "farmId" TEXT NOT NULL,
        "animalId" TEXT NOT NULL,
        CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "Transaction_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
        CONSTRAINT "Transaction_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS "Event" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
        "title" VARCHAR(255) NOT NULL,
        "type" VARCHAR(50) NOT NULL,
        "date" TIMESTAMP(3) NOT NULL,
        "description" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "farmId" TEXT NOT NULL,
        CONSTRAINT "Event_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "Event_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS "Birth" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
        "birthDate" TIMESTAMP(3) NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "motherId" TEXT NOT NULL,
        "fatherId" TEXT NOT NULL,
        "childId" TEXT NOT NULL,
        "animalId" TEXT,
        CONSTRAINT "Birth_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "Birth_childId_key" UNIQUE ("childId"),
        CONSTRAINT "Birth_motherId_fkey" FOREIGN KEY ("motherId") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
        CONSTRAINT "Birth_fatherId_fkey" FOREIGN KEY ("fatherId") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
        CONSTRAINT "Birth_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
        CONSTRAINT "Birth_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE SET NULL ON UPDATE CASCADE
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS "EventAnimal" (
        "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "eventId" TEXT NOT NULL,
        "animalId" TEXT NOT NULL,
        CONSTRAINT "EventAnimal_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "EventAnimal_eventId_animalId_key" UNIQUE ("eventId", "animalId"),
        CONSTRAINT "EventAnimal_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT "EventAnimal_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);

    console.log('✅ All tables created successfully!');

    // Now create the farm and admin user
    console.log('🏭 Creating farm and admin user...');
    
    // Check if farm exists
    const farmResult = await client.query(`SELECT id FROM "Farm" WHERE name = 'Fazenda Vista Alegre' LIMIT 1`);
    let farmId;
    
    if (farmResult.rows.length === 0) {
      const farmInsert = await client.query(`
        INSERT INTO "Farm" (name, address, phone, active)
        VALUES ('Fazenda Vista Alegre', 'Estrada Municipal km 12, Zona Rural', '(11) 98765-4321', true)
        RETURNING id
      `);
      farmId = farmInsert.rows[0].id;
      console.log('✅ Farm created');
    } else {
      farmId = farmResult.rows[0].id;
      console.log('✅ Farm already exists');
    }

    // Check if admin user exists
    const userResult = await client.query(`SELECT id FROM "User" WHERE username = 'gustavo' LIMIT 1`);
    
    if (userResult.rows.length === 0) {
      // Hash password using Node.js crypto (simpler than bcrypt)
      const crypto = require('crypto');
      const hashedPassword = crypto.createHash('sha256').update('ForteCavalo89@').digest('hex');
      
      await client.query(`
        INSERT INTO "User" (username, email, password, "fullName", role, "farmId", active)
        VALUES ('gustavo', 'gustavo@fazendavistaalegre.com.br', $1, 'Gustavo Silva', 'ADMIN', $2, true)
      `, [hashedPassword, farmId]);
      console.log('✅ Admin user created');
    } else {
      console.log('✅ Admin user already exists');
    }

    console.log('\n🎉 Database setup completed!');
    console.log('📱 Login credentials:');
    console.log('   Username: gustavo');
    console.log('   Password: ForteCavalo89@');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.end();
  }
}

createTables();