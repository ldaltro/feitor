-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
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
    "loteId" TEXT,
    CONSTRAINT "Animal_loteId_fkey" FOREIGN KEY ("loteId") REFERENCES "Lote" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Animal" ("abortionDate", "birthDate", "breed", "createdAt", "expectedBirthDate", "gender", "id", "inseminationDate", "loteId", "name", "reproductiveStatus", "status", "tag", "updatedAt") SELECT "abortionDate", "birthDate", "breed", "createdAt", "expectedBirthDate", "gender", "id", "inseminationDate", "loteId", "name", "reproductiveStatus", "status", "tag", "updatedAt" FROM "Animal";
DROP TABLE "Animal";
ALTER TABLE "new_Animal" RENAME TO "Animal";
CREATE UNIQUE INDEX "Animal_tag_key" ON "Animal"("tag");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
