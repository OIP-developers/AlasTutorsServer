/*
  Warnings:

  - You are about to drop the column `main_image` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `ProductCategory` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `ProductImage` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `ProductImage` table. All the data in the column will be lost.
  - Added the required column `featured_image` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Made the column `categoryId` on table `ProductCategory` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `gallery` to the `ProductImage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_categoryId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "main_image",
ADD COLUMN     "featured_image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductCategory" DROP COLUMN "isDeleted",
ADD COLUMN     "subCategoryId" TEXT,
ALTER COLUMN "categoryId" SET NOT NULL;

-- AlterTable
ALTER TABLE "ProductImage" DROP COLUMN "image",
DROP COLUMN "isDeleted",
ADD COLUMN     "gallery" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ProductTag" (
    "id" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "productId" TEXT,
    "status" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ProductTag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductTag" ADD CONSTRAINT "ProductTag_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
