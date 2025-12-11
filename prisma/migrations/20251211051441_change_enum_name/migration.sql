/*
  Warnings:

  - The values [pre_oral] on the enum `ReceiptName` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ReceiptName_new" AS ENUM ('thesis_proposal', 'pre_oral_defense', 'final_defense');
ALTER TABLE "ThesisReceipt" ALTER COLUMN "receipt_name" TYPE "ReceiptName_new" USING ("receipt_name"::text::"ReceiptName_new");
ALTER TYPE "ReceiptName" RENAME TO "ReceiptName_old";
ALTER TYPE "ReceiptName_new" RENAME TO "ReceiptName";
DROP TYPE "public"."ReceiptName_old";
COMMIT;
