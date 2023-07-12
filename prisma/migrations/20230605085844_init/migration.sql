/*
  Warnings:

  - You are about to drop the column `subTitle` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `ProductImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductImage" DROP CONSTRAINT "ProductImage_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductTag" DROP CONSTRAINT "ProductTag_productId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "subTitle";

-- DropTable
DROP TABLE "ProductImage";

-- DropTable
DROP TABLE "ProductTag";
