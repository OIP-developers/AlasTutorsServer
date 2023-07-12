/*
  Warnings:

  - You are about to drop the column `productId` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `rideId` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `ProductCategory` table. All the data in the column will be lost.
  - You are about to drop the column `subCategoryId` on the `ProductCategory` table. All the data in the column will be lost.
  - You are about to drop the column `gallery` on the `ProductImage` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `ProductImage` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `ProductTag` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `ProductTag` table. All the data in the column will be lost.
  - You are about to drop the `OrderDetail` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `orderId` on table `Invoice` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `tag` to the `ProductTag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_productId_fkey";

-- DropForeignKey
ALTER TABLE "OrderDetail" DROP CONSTRAINT "OrderDetail_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderDetail" DROP CONSTRAINT "OrderDetail_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_subCategoryId_fkey";

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "productId",
DROP COLUMN "rideId",
ALTER COLUMN "orderId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "ProductCategory" DROP COLUMN "status",
DROP COLUMN "subCategoryId";

-- AlterTable
ALTER TABLE "ProductImage" DROP COLUMN "gallery",
DROP COLUMN "status",
ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "ProductTag" DROP COLUMN "status",
DROP COLUMN "tags",
ADD COLUMN     "tag" TEXT NOT NULL;

-- DropTable
DROP TABLE "OrderDetail";

-- CreateTable
CREATE TABLE "OrderItems" (
    "id" TEXT NOT NULL,
    "orderId" TEXT,
    "productId" TEXT,
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "OrderItems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
