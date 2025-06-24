/*
  Warnings:

  - You are about to drop the `_ConsultationToThesis` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `thesis_id` to the `Consultation` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_ConsultationToThesis_B_index";

-- DropIndex
DROP INDEX "_ConsultationToThesis_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ConsultationToThesis";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Consultation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date_time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" TEXT,
    "recommendation" INTEGER,
    "thesis_id" INTEGER NOT NULL,
    CONSTRAINT "Consultation_thesis_id_fkey" FOREIGN KEY ("thesis_id") REFERENCES "Thesis" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Consultation" ("date_time", "id", "location", "recommendation") SELECT "date_time", "id", "location", "recommendation" FROM "Consultation";
DROP TABLE "Consultation";
ALTER TABLE "new_Consultation" RENAME TO "Consultation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
