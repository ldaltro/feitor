/*
  Warnings:

  - Added the required column `fatherId` to the `Birth` table without a default value. This is not possible if the table is not empty.

*/

-- First, get a male animal ID to use as a default father
-- This will be temporary and can be updated later
CREATE TEMPORARY TABLE temp_male_animals AS
SELECT id FROM "Animal" WHERE gender = 'Macho' LIMIT 1;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Birth" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "birthDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "motherId" TEXT NOT NULL,
    "fatherId" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "animalId" TEXT,
    CONSTRAINT "Birth_motherId_fkey" FOREIGN KEY ("motherId") REFERENCES "Animal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Birth_fatherId_fkey" FOREIGN KEY ("fatherId") REFERENCES "Animal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Birth_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Animal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Birth_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- Insert data with default fatherId from temp table
INSERT INTO "new_Birth" ("birthDate", "childId", "createdAt", "id", "motherId", "updatedAt", "fatherId") 
SELECT "birthDate", "childId", "createdAt", "id", "motherId", "updatedAt", 
  (SELECT id FROM temp_male_animals) 
FROM "Birth";

DROP TABLE "Birth";
ALTER TABLE "new_Birth" RENAME TO "Birth";
CREATE UNIQUE INDEX "Birth_childId_key" ON "Birth"("childId");

-- Drop temporary table
DROP TABLE temp_male_animals;

PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
