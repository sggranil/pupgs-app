/*
  Warnings:

  - Made the column `user_id` on table `Thesis` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Thesis" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "thesis_title" TEXT NOT NULL,
    "student_id" INTEGER NOT NULL,
    "adviser_id" INTEGER,
    "is_confirmed" BOOLEAN,
    "user_id" INTEGER NOT NULL,
    "defense_date" DATETIME,
    "defense_time" DATETIME,
    CONSTRAINT "Thesis_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Thesis_adviser_id_fkey" FOREIGN KEY ("adviser_id") REFERENCES "Adviser" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Thesis_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Thesis" ("adviser_id", "defense_date", "defense_time", "id", "is_confirmed", "student_id", "thesis_title", "user_id") SELECT "adviser_id", "defense_date", "defense_time", "id", "is_confirmed", "student_id", "thesis_title", "user_id" FROM "Thesis";
DROP TABLE "Thesis";
ALTER TABLE "new_Thesis" RENAME TO "Thesis";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
