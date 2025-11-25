/*
  Warnings:

  - Made the column `thesis_id` on table `EnrolledSubject` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EnrolledSubject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "student_id" INTEGER NOT NULL,
    "thesis_id" INTEGER NOT NULL,
    "subject_name" TEXT NOT NULL,
    "or_number" TEXT NOT NULL,
    "attachment" TEXT NOT NULL,
    "status" TEXT,
    "message" TEXT,
    "enrolled_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EnrolledSubject_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EnrolledSubject_thesis_id_fkey" FOREIGN KEY ("thesis_id") REFERENCES "Thesis" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EnrolledSubject" ("attachment", "enrolled_at", "id", "message", "or_number", "status", "student_id", "subject_name", "thesis_id") SELECT "attachment", "enrolled_at", "id", "message", "or_number", "status", "student_id", "subject_name", "thesis_id" FROM "EnrolledSubject";
DROP TABLE "EnrolledSubject";
ALTER TABLE "new_EnrolledSubject" RENAME TO "EnrolledSubject";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
