-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "ext_name" TEXT,
    "role" TEXT NOT NULL,
    "tel_number" TEXT,
    "standing" TEXT,
    "program" TEXT,
    "position" TEXT
);

-- CreateTable
CREATE TABLE "Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "Student_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Adviser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "Adviser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Thesis" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "thesis_title" TEXT NOT NULL,
    "student_id" INTEGER,
    "adviser_id" INTEGER,
    "is_confirmed" BOOLEAN,
    "message" TEXT,
    "user_id" INTEGER,
    "defense_date" DATETIME,
    "defense_time" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Thesis_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Thesis_adviser_id_fkey" FOREIGN KEY ("adviser_id") REFERENCES "Adviser" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Thesis_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Proposal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "thesis_id" INTEGER NOT NULL,
    "file_url" TEXT NOT NULL,
    "uploaded_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Proposal_thesis_id_fkey" FOREIGN KEY ("thesis_id") REFERENCES "Thesis" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EnrolledSubject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "student_id" INTEGER NOT NULL,
    "subject_name" TEXT NOT NULL,
    "or_number" TEXT NOT NULL,
    "attachment" TEXT NOT NULL,
    "is_confirmed" BOOLEAN,
    "message" TEXT,
    "enrolled_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EnrolledSubject_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ThesisPanelists" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ThesisPanelists_A_fkey" FOREIGN KEY ("A") REFERENCES "Adviser" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ThesisPanelists_B_fkey" FOREIGN KEY ("B") REFERENCES "Thesis" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_user_id_key" ON "Student"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Adviser_user_id_key" ON "Adviser"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "_ThesisPanelists_AB_unique" ON "_ThesisPanelists"("A", "B");

-- CreateIndex
CREATE INDEX "_ThesisPanelists_B_index" ON "_ThesisPanelists"("B");
