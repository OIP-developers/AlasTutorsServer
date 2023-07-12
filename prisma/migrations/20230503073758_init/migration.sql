/*
  Warnings:

  - Made the column `categoryId` on table `SubCategory` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "SubCategory" DROP CONSTRAINT "SubCategory_categoryId_fkey";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "image" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "title" SET DATA TYPE TEXT,
ALTER COLUMN "subTitle" SET DATA TYPE TEXT,
ALTER COLUMN "main_image" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ProductImage" ALTER COLUMN "image" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "SubCategory" ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "categoryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
