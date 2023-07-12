/*
  Warnings:

  - The `status` column on the `Category` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Example` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Invoice` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Keystore` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Role` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `SubCategory` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `order` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `slug` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `Category` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PUBLIC', 'PRIVATE', 'DRAFT');

-- DropForeignKey
ALTER TABLE "SubCategory" DROP CONSTRAINT "SubCategory_categoryId_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "sub_categoryId" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "Status" DEFAULT 'PUBLIC',
ALTER COLUMN "order" SET NOT NULL,
ALTER COLUMN "slug" SET NOT NULL,
ALTER COLUMN "title" SET NOT NULL;

-- AlterTable
ALTER TABLE "Example" DROP COLUMN "status",
ADD COLUMN     "status" "Status" DEFAULT 'PUBLIC';

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PUBLIC';

-- AlterTable
ALTER TABLE "Keystore" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PUBLIC';

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "status",
ADD COLUMN     "status" "Status" DEFAULT 'PUBLIC';

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PUBLIC';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "status",
ADD COLUMN     "status" "Status" DEFAULT 'PUBLIC';

-- DropTable
DROP TABLE "SubCategory";

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_sub_categoryId_fkey" FOREIGN KEY ("sub_categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
