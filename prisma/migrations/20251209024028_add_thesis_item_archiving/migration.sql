-- AlterTable
ALTER TABLE "Attachment" ADD COLUMN     "description" TEXT,
ADD COLUMN     "is_archived" BOOLEAN DEFAULT false,
ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "Thesis" ADD COLUMN     "is_archived" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "ThesisReceipt" ADD COLUMN     "is_archived" BOOLEAN NOT NULL DEFAULT false;
