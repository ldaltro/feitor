-- Complete SQL script to create all remaining tables for the animal management system

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

-- Lote table (Groups/Lots of animals)
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

-- Transaction table (Buy/Sell records)
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

-- Event table (Management events like vaccinations, weighing, etc.)
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

-- EventAnimal table (Many-to-many relationship between events and animals)
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

-- Add the foreign key constraint for Animal -> Lote (this needs to be done after Lote table is created)
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_loteId_fkey" FOREIGN KEY ("loteId") REFERENCES "Lote"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "Animal_farmId_idx" ON "Animal"("farmId");
CREATE INDEX IF NOT EXISTS "User_farmId_idx" ON "User"("farmId");
CREATE INDEX IF NOT EXISTS "Transaction_farmId_idx" ON "Transaction"("farmId");
CREATE INDEX IF NOT EXISTS "Event_farmId_idx" ON "Event"("farmId");
CREATE INDEX IF NOT EXISTS "Lote_farmId_idx" ON "Lote"("farmId");
CREATE INDEX IF NOT EXISTS "Birth_motherId_idx" ON "Birth"("motherId");
CREATE INDEX IF NOT EXISTS "Birth_fatherId_idx" ON "Birth"("fatherId");
CREATE INDEX IF NOT EXISTS "Birth_childId_idx" ON "Birth"("childId");
CREATE INDEX IF NOT EXISTS "EventAnimal_eventId_idx" ON "EventAnimal"("eventId");
CREATE INDEX IF NOT EXISTS "EventAnimal_animalId_idx" ON "EventAnimal"("animalId");

-- Optional: Insert some sample data for testing
-- You can uncomment these if you want some test data

/*
-- Sample Lote (Animal Groups)
INSERT INTO "Lote" ("id", "nome", "descricao", "finalidade", "farmId") 
VALUES 
  ('lote-001', 'Lote Matrizes', 'Vacas reprodutoras principais', 'Cria', 'farm-gustavo-001'),
  ('lote-002', 'Lote Engorda 2024', 'Animais em fase de engorda', 'Engorda', 'farm-gustavo-001');

-- Sample Animals
INSERT INTO "Animal" ("id", "name", "tag", "breed", "gender", "birthDate", "status", "farmId", "loteId")
VALUES 
  ('animal-001', 'Mimosa', '001', 'Nelore', 'F', '2020-03-15'::timestamp, 'active', 'farm-gustavo-001', 'lote-001'),
  ('animal-002', 'Estrela', '002', 'Angus', 'F', '2019-07-22'::timestamp, 'active', 'farm-gustavo-001', 'lote-001'),
  ('animal-003', 'Tornado', '003', 'Nelore', 'M', '2018-11-10'::timestamp, 'active', 'farm-gustavo-001', 'lote-002');
*/