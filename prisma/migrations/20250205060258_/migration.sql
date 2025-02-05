-- CreateTable
CREATE TABLE "_ThesisPanelists" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ThesisPanelists_A_fkey" FOREIGN KEY ("A") REFERENCES "Adviser" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ThesisPanelists_B_fkey" FOREIGN KEY ("B") REFERENCES "Thesis" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EnrolledSubject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "student_id" INTEGER NOT NULL,
    "subject_name" TEXT NOT NULL,
    "or_number" TEXT NOT NULL,
    "attachment" TEXT NOT NULL,
    "is_confirmed" BOOLEAN,
    "enrolled_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EnrolledSubject_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EnrolledSubject" ("attachment", "enrolled_at", "id", "is_confirmed", "or_number", "student_id", "subject_name") SELECT "attachment", "enrolled_at", "id", "is_confirmed", "or_number", "student_id", "subject_name" FROM "EnrolledSubject";
DROP TABLE "EnrolledSubject";
ALTER TABLE "new_EnrolledSubject" RENAME TO "EnrolledSubject";
CREATE TABLE "new_Thesis" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "thesis_title" TEXT NOT NULL,
    "student_id" INTEGER NOT NULL,
    "adviser_id" INTEGER NOT NULL,
    "is_confirmed" BOOLEAN,
    "user_id" INTEGER NOT NULL,
    "defense_date" DATETIME,
    "defense_time" DATETIME,
    CONSTRAINT "Thesis_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Thesis_adviser_id_fkey" FOREIGN KEY ("adviser_id") REFERENCES "Adviser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Thesis_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Thesis" ("adviser_id", "id", "is_confirmed", "student_id", "thesis_title", "user_id") SELECT "adviser_id", "id", "is_confirmed", "student_id", "thesis_title", "user_id" FROM "Thesis";
DROP TABLE "Thesis";
ALTER TABLE "new_Thesis" RENAME TO "Thesis";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_ThesisPanelists_AB_unique" ON "_ThesisPanelists"("A", "B");

-- CreateIndex
CREATE INDEX "_ThesisPanelists_B_index" ON "_ThesisPanelists"("B");
