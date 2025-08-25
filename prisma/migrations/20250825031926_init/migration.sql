-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "ext_name" TEXT,
    "prefix" TEXT,
    "role" TEXT NOT NULL,
    "tel_number" TEXT,
    "start_date" DATETIME,
    "pass_date" DATETIME,
    "standing" TEXT,
    "program" TEXT,
    "department" TEXT,
    "position" TEXT,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false
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
CREATE TABLE "Room" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "capacity" INTEGER
);

-- CreateTable
CREATE TABLE "Consultation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date_time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" TEXT,
    "recommendation" INTEGER,
    "thesis_id" INTEGER NOT NULL,
    CONSTRAINT "Consultation_thesis_id_fkey" FOREIGN KEY ("thesis_id") REFERENCES "Thesis" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Thesis" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "thesis_title" TEXT NOT NULL,
    "student_id" INTEGER,
    "adviser_id" INTEGER,
    "defense_phase" TEXT,
    "status" TEXT,
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
    "status" TEXT,
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
CREATE UNIQUE INDEX "Room_name_key" ON "Room"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ThesisPanelists_AB_unique" ON "_ThesisPanelists"("A", "B");

-- CreateIndex
CREATE INDEX "_ThesisPanelists_B_index" ON "_ThesisPanelists"("B");
