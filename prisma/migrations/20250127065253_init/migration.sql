-- CreateTable
CREATE TABLE "Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "standing" TEXT NOT NULL,
    "tel_number" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Adviser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "tel_number" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Thesis" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "thesis_title" TEXT NOT NULL,
    "student_id" INTEGER NOT NULL,
    "adviser_id" INTEGER NOT NULL,
    "is_confirmed" BOOLEAN NOT NULL,
    CONSTRAINT "Thesis_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Thesis_adviser_id_fkey" FOREIGN KEY ("adviser_id") REFERENCES "Adviser" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Adviser_email_key" ON "Adviser"("email");
