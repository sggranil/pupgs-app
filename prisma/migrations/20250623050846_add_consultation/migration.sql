-- AlterTable
ALTER TABLE "User" ADD COLUMN "department" TEXT;
ALTER TABLE "User" ADD COLUMN "prefix" TEXT;

-- CreateTable
CREATE TABLE "Consultation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date_time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" TEXT,
    "recommendation" INTEGER
);

-- CreateTable
CREATE TABLE "_ConsultationToThesis" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ConsultationToThesis_A_fkey" FOREIGN KEY ("A") REFERENCES "Consultation" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ConsultationToThesis_B_fkey" FOREIGN KEY ("B") REFERENCES "Thesis" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_ConsultationToThesis_AB_unique" ON "_ConsultationToThesis"("A", "B");

-- CreateIndex
CREATE INDEX "_ConsultationToThesis_B_index" ON "_ConsultationToThesis"("B");
