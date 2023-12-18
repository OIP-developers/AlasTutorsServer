/*
  Warnings:

  - You are about to drop the column `orderId` on the `Invoice` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_orderId_fkey";

-- DropIndex
DROP INDEX "Invoice_orderId_key";

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "orderId";
