-- Create tables for the application

-- Farm table
CREATE TABLE IF NOT EXISTS "Farm" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "name" VARCHAR(255) NOT NULL,
  "address" TEXT,
  "phone" VARCHAR(50),
  "active" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Farm_pkey" PRIMARY KEY ("id")
);

-- User table
CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "username" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) NOT NULL,
  "password" TEXT NOT NULL,
  "fullName" VARCHAR(255) NOT NULL,
  "role" VARCHAR(50) NOT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "farmId" TEXT,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "User_username_key" UNIQUE ("username"),
  CONSTRAINT "User_email_key" UNIQUE ("email"),
  CONSTRAINT "User_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- Animal table
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
  CONSTRAINT "Animal_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Lote table
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

-- Birth table
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

-- Transaction table
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

-- Event table
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

-- EventAnimal table
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

-- Add foreign key for Animal -> Lote
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_loteId_fkey" FOREIGN KEY ("loteId") REFERENCES "Lote"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Create indexes
CREATE INDEX IF NOT EXISTS "Animal_farmId_idx" ON "Animal"("farmId");
CREATE INDEX IF NOT EXISTS "User_farmId_idx" ON "User"("farmId");
CREATE INDEX IF NOT EXISTS "Transaction_farmId_idx" ON "Transaction"("farmId");
CREATE INDEX IF NOT EXISTS "Event_farmId_idx" ON "Event"("farmId");
CREATE INDEX IF NOT EXISTS "Lote_farmId_idx" ON "Lote"("farmId");

-- Insert initial data
-- First create the farm
INSERT INTO "Farm" ("id", "name", "address", "phone") 
VALUES ('farm-gustavo-001', 'Fazenda Vista Alegre', 'Estrada Municipal km 12, Zona Rural', '(11) 98765-4321');

-- Then create the admin user
-- Password: ForteCavalo89@
-- Hashed using bcryptjs with 10 rounds
INSERT INTO "User" ("id", "username", "email", "password", "fullName", "role", "farmId") 
VALUES (
  'user-gustavo-001', 
  'gustavo', 
  'gustavo@fazendavistaalegre.com.br',
  '$2a$10$kZJxQoRvJRYK3zlPqxWV8.TQqTQ8aeu8R9T2J0ycCXKVLBfwqxOuO',
  'Gustavo Silva',
  'ADMIN',
  'farm-gustavo-001'
);