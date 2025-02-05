/*
  Warnings:

  - Added the required column `or_number` to the `EnrolledSubject` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EnrolledSubject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "student_id" INTEGER NOT NULL,
    "subject_name" TEXT NOT NULL,
    "or_number" TEXT NOT NULL,
    "attachment" TEXT NOT NULL,
    "is_confirmed" BOOLEAN NOT NULL,
    "enrolled_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EnrolledSubject_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EnrolledSubject" ("attachment", "enrolled_at", "id", "is_confirmed", "student_id", "subject_name") SELECT "attachment", "enrolled_at", "id", "is_confirmed", "student_id", "subject_name" FROM "EnrolledSubject";
DROP TABLE "EnrolledSubject";
ALTER TABLE "new_EnrolledSubject" RENAME TO "EnrolledSubject";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
