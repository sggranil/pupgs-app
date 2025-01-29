/*
  Warnings:

  - You are about to drop the column `email` on the `Adviser` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `Adviser` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `Adviser` table. All the data in the column will be lost.
  - You are about to drop the column `middle_name` on the `Adviser` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Adviser` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Adviser` table. All the data in the column will be lost.
  - You are about to drop the column `tel_number` on the `Adviser` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `middle_name` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `standing` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `tel_number` on the `Student` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Adviser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Thesis` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "tel_number" TEXT NOT NULL,
    "standing" TEXT,
    "position" TEXT
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Adviser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "Adviser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Adviser" ("id") SELECT "id" FROM "Adviser";
DROP TABLE "Adviser";
ALTER TABLE "new_Adviser" RENAME TO "Adviser";
CREATE UNIQUE INDEX "Adviser_user_id_key" ON "Adviser"("user_id");
CREATE TABLE "new_Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "Student_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Student" ("id") SELECT "id" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_user_id_key" ON "Student"("user_id");
CREATE TABLE "new_Thesis" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "thesis_title" TEXT NOT NULL,
    "student_id" INTEGER NOT NULL,
    "adviser_id" INTEGER NOT NULL,
    "is_confirmed" BOOLEAN NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "Thesis_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Thesis_adviser_id_fkey" FOREIGN KEY ("adviser_id") REFERENCES "Adviser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Thesis_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Thesis" ("adviser_id", "id", "is_confirmed", "student_id", "thesis_title") SELECT "adviser_id", "id", "is_confirmed", "student_id", "thesis_title" FROM "Thesis";
DROP TABLE "Thesis";
ALTER TABLE "new_Thesis" RENAME TO "Thesis";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
