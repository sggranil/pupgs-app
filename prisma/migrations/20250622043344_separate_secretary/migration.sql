/*
  Warnings:

  - You are about to drop the `ThesisSecretary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ThesisSecretary` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_ThesisSecretary_B_index";

-- DropIndex
DROP INDEX "_ThesisSecretary_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ThesisSecretary";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ThesisSecretary";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Thesis" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "thesis_title" TEXT NOT NULL,
    "student_id" INTEGER,
    "adviser_id" INTEGER,
    "defense_phase" TEXT,
    "is_confirmed" BOOLEAN,
    "message" TEXT,
    "user_id" INTEGER,
    "secretary_id" INTEGER,
    "defense_date" DATETIME,
    "defense_time" DATETIME,
    "room_id" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Thesis_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Thesis_adviser_id_fkey" FOREIGN KEY ("adviser_id") REFERENCES "Adviser" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Thesis_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Thesis_secretary_id_fkey" FOREIGN KEY ("secretary_id") REFERENCES "Adviser" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Thesis_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Thesis" ("adviser_id", "created_at", "defense_date", "defense_phase", "defense_time", "id", "is_confirmed", "message", "room_id", "student_id", "thesis_title", "user_id") SELECT "adviser_id", "created_at", "defense_date", "defense_phase", "defense_time", "id", "is_confirmed", "message", "room_id", "student_id", "thesis_title", "user_id" FROM "Thesis";
DROP TABLE "Thesis";
ALTER TABLE "new_Thesis" RENAME TO "Thesis";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
