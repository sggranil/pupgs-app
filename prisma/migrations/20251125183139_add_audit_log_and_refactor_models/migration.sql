-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('student', 'adviser', 'chairperson', 'dean', 'admin');

-- CreateEnum
CREATE TYPE "DefensePhase" AS ENUM ('concept_paper', 'thesis_proposal', 'urec', 'statistical_endorsement', 'pre_oral_defense', 'final_defense');

-- CreateEnum
CREATE TYPE "ThesisStatus" AS ENUM ('pending_review', 'approve_for_proposal_defense', 'approve_for_urec', 'approve_for_statistic', 'approve_for_pre_oral_defense', 'approve_for_final_defense', 'minor_revisions', 'major_revisions', 'revise_and_resubmit', 'withdrawn', 'on_hold');

-- CreateEnum
CREATE TYPE "ThesisReceiptStatus" AS ENUM ('pending_review', 'confirmed', 'reupload_required', 'invalid', 'rejected');

-- CreateEnum
CREATE TYPE "ReceiptName" AS ENUM ('thesis_proposal', 'pre_oral', 'final_defense');

-- CreateEnum
CREATE TYPE "AuditOperation" AS ENUM ('create', 'update', 'delete', 'login', 'logout', 'password_change');

-- CreateEnum
CREATE TYPE "DeviceType" AS ENUM ('web', 'mobile_ios', 'mobile_android', 'desktop_app', 'other');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "ext_name" TEXT,
    "prefix" TEXT,
    "role" "UserRole" NOT NULL,
    "tel_number" TEXT,
    "start_date" TIMESTAMP(3),
    "pass_date" TIMESTAMP(3),
    "standing" TEXT,
    "program" TEXT,
    "department" TEXT,
    "position" TEXT,
    "is_archived" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adviser" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Adviser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "capacity" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Thesis" (
    "id" SERIAL NOT NULL,
    "thesis_title" TEXT NOT NULL,
    "student_id" INTEGER,
    "adviser_id" INTEGER,
    "defense_phase" "DefensePhase",
    "status" "ThesisStatus",
    "message" TEXT,
    "secretary_id" INTEGER,
    "defense_schedule" TIMESTAMP(3),
    "room_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Thesis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attachment" (
    "id" SERIAL NOT NULL,
    "thesis_id" INTEGER NOT NULL,
    "file_type" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThesisReceipt" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "thesis_id" INTEGER NOT NULL,
    "receipt_name" "ReceiptName" NOT NULL,
    "or_number" TEXT NOT NULL,
    "attachment" TEXT NOT NULL,
    "status" "ThesisReceiptStatus",
    "message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ThesisReceipt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" SERIAL NOT NULL,
    "operation" "AuditOperation" NOT NULL,
    "message" TEXT NOT NULL,
    "table_name" TEXT,
    "record_id" INTEGER,
    "old_data" JSONB,
    "new_data" JSONB,
    "user_id" INTEGER,
    "device_type" "DeviceType",
    "device_id" TEXT,
    "ip_address" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ThesisPanelists" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ThesisPanelists_AB_pkey" PRIMARY KEY ("A","B")
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
CREATE UNIQUE INDEX "ThesisReceipt_or_number_key" ON "ThesisReceipt"("or_number");

-- CreateIndex
CREATE INDEX "_ThesisPanelists_B_index" ON "_ThesisPanelists"("B");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adviser" ADD CONSTRAINT "Adviser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thesis" ADD CONSTRAINT "Thesis_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thesis" ADD CONSTRAINT "Thesis_adviser_id_fkey" FOREIGN KEY ("adviser_id") REFERENCES "Adviser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thesis" ADD CONSTRAINT "Thesis_secretary_id_fkey" FOREIGN KEY ("secretary_id") REFERENCES "Adviser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thesis" ADD CONSTRAINT "Thesis_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_thesis_id_fkey" FOREIGN KEY ("thesis_id") REFERENCES "Thesis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThesisReceipt" ADD CONSTRAINT "ThesisReceipt_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ThesisReceipt" ADD CONSTRAINT "ThesisReceipt_thesis_id_fkey" FOREIGN KEY ("thesis_id") REFERENCES "Thesis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ThesisPanelists" ADD CONSTRAINT "_ThesisPanelists_A_fkey" FOREIGN KEY ("A") REFERENCES "Adviser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ThesisPanelists" ADD CONSTRAINT "_ThesisPanelists_B_fkey" FOREIGN KEY ("B") REFERENCES "Thesis"("id") ON DELETE CASCADE ON UPDATE CASCADE;
