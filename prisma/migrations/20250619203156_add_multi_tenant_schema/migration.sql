-- CreateTable
CREATE TABLE "Farm" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- Create default farm for existing data
INSERT INTO "Farm" ("id", "name", "updatedAt") 
VALUES ('default-farm-id', 'Fazenda Principal', CURRENT_TIMESTAMP);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;

-- Update User table
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "farmId" TEXT,
    CONSTRAINT "User_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- Migrate existing user to admin
INSERT INTO "new_User" ("id", "username", "email", "password", "fullName", "role", "active", "createdAt", "updatedAt", "farmId") 
SELECT 
    "id", 
    "username",
    "username" || '@farm.com' as "email",
    "password",
    "username" as "fullName",
    'ADMIN' as "role",
    true as "active",
    "createdAt", 
    "updatedAt",
    NULL as "farmId"
FROM "User";

DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- Update Animal table
CREATE TABLE "new_Animal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "reproductiveStatus" TEXT,
    "inseminationDate" DATETIME,
    "expectedBirthDate" DATETIME,
    "abortionDate" DATETIME,
    "weight" REAL,
    "notes" TEXT,
    "purchaseDate" DATETIME,
    "purchaseValue" REAL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "farmId" TEXT NOT NULL,
    "loteId" TEXT,
    CONSTRAINT "Animal_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Animal_loteId_fkey" FOREIGN KEY ("loteId") REFERENCES "Lote" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

INSERT INTO "new_Animal" ("id", "name", "tag", "breed", "gender", "birthDate", "status", "reproductiveStatus", "inseminationDate", "expectedBirthDate", "abortionDate", "weight", "notes", "purchaseDate", "purchaseValue", "active", "createdAt", "updatedAt", "farmId", "loteId") 
SELECT 
    "id", "name", "tag", "breed", "gender", "birthDate", "status", 
    "reproductiveStatus", "inseminationDate", "expectedBirthDate", 
    "abortionDate", "weight", "notes", "purchaseDate", "purchaseValue", 
    "active", "createdAt", "updatedAt", 
    'default-farm-id' as "farmId",
    "loteId" 
FROM "Animal";

DROP TABLE "Animal";
ALTER TABLE "new_Animal" RENAME TO "Animal";
CREATE UNIQUE INDEX "Animal_tag_farmId_key" ON "Animal"("tag", "farmId");

-- Update Lote table
CREATE TABLE "new_Lote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "finalidade" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "farmId" TEXT NOT NULL,
    CONSTRAINT "Lote_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

INSERT INTO "new_Lote" ("id", "nome", "descricao", "finalidade", "createdAt", "updatedAt", "farmId") 
SELECT 
    "id", "nome", "descricao", "finalidade", "createdAt", "updatedAt",
    'default-farm-id' as "farmId"
FROM "Lote";

DROP TABLE "Lote";
ALTER TABLE "new_Lote" RENAME TO "Lote";

-- Update Event table
CREATE TABLE "new_Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "farmId" TEXT NOT NULL,
    CONSTRAINT "Event_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

INSERT INTO "new_Event" ("id", "title", "type", "date", "description", "createdAt", "updatedAt", "farmId") 
SELECT 
    "id", "title", "type", "date", "description", "createdAt", "updatedAt",
    'default-farm-id' as "farmId"
FROM "Event";

DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";

-- Update Transaction table
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "value" REAL NOT NULL,
    "person" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "farmId" TEXT NOT NULL,
    "animalId" TEXT NOT NULL,
    CONSTRAINT "Transaction_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transaction_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

INSERT INTO "new_Transaction" ("id", "type", "date", "value", "person", "createdAt", "updatedAt", "farmId", "animalId") 
SELECT 
    "id", "type", "date", "value", "person", "createdAt", "updatedAt",
    'default-farm-id' as "farmId",
    "animalId"
FROM "Transaction";

DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";

PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;