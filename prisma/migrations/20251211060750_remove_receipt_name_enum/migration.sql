/*
  Warnings:

  - Changed the type of `receipt_name` on the `ThesisReceipt` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ThesisReceipt" DROP COLUMN "receipt_name",
ADD COLUMN     "receipt_name" TEXT NOT NULL;

-- DropEnum
DROP TYPE "ReceiptName";
