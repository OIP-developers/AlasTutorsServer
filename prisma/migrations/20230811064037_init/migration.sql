/*
  Warnings:

  - You are about to drop the `AddCart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AddCart" DROP CONSTRAINT "AddCart_cartId_fkey";

-- DropForeignKey
ALTER TABLE "AddCart" DROP CONSTRAINT "AddCart_userId_fkey";

-- DropTable
DROP TABLE "AddCart";
