/*
  Warnings:

  - Changed the type of `receipt_name` on the `ThesisReceipt` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ReceiptName" AS ENUM ('thesis_proposal', 'pre_oral_defense', 'final_defense');

-- AlterTable
ALTER TABLE "ThesisReceipt" DROP COLUMN "receipt_name",
ADD COLUMN     "receipt_name" "ReceiptName" NOT NULL;
