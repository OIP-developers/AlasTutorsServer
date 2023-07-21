/*
  Warnings:

  - You are about to drop the column `about` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `courseSubCategoryId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `discussion` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `CourseCategory` table. All the data in the column will be lost.
  - You are about to drop the column `isPublish` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `company_name` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `fullname` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `zip_code` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `OrderItems` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `OrderItems` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `fileId` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CourseSubCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Wallet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `courseReview` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `CourseCategory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Video` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bannerId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `Course` table without a default value. This is not possible if the table is not empty.
  - The required column `slug` was added to the `Course` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `thumbnailId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Made the column `price` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - The required column `slug` was added to the `CourseCategory` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Made the column `userId` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sub_total` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `total` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `CourseId` to the `OrderItems` table without a default value. This is not possible if the table is not empty.
  - Made the column `orderId` on table `OrderItems` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `OrderItems` required. This step will fail if there are existing NULL values in that column.
  - Made the column `stripe_customerId` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `description` to the `Video` table without a default value. This is not possible if the table is not empty.
  - The required column `slug` was added to the `Video` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Currency" ADD VALUE 'PKR';
ALTER TYPE "Currency" ADD VALUE 'INR';

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_ProductId_fkey";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_courseSubCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "CourseSubCategory" DROP CONSTRAINT "CourseSubCategory_courseCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItems" DROP CONSTRAINT "OrderItems_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItems" DROP CONSTRAINT "OrderItems_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ProductCategory" DROP CONSTRAINT "ProductCategory_productId_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_fileId_fkey";

-- DropForeignKey
ALTER TABLE "Wallet" DROP CONSTRAINT "Wallet_userId_fkey";

-- DropForeignKey
ALTER TABLE "courseReview" DROP CONSTRAINT "courseReview_courseId_fkey";

-- DropForeignKey
ALTER TABLE "courseReview" DROP CONSTRAINT "courseReview_userId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "about",
DROP COLUMN "courseSubCategoryId",
DROP COLUMN "discussion",
DROP COLUMN "imageUrl",
ADD COLUMN     "bannerId" TEXT NOT NULL,
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdById" TEXT NOT NULL,
ADD COLUMN     "currency" "Currency" DEFAULT 'USD',
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "status" "Status" DEFAULT 'PUBLIC',
ADD COLUMN     "thumbnailId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "rating" SET DEFAULT 0.0,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "CourseCategory" DROP COLUMN "imageUrl",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "status" "Status" DEFAULT 'PUBLIC',
ADD COLUMN     "thumbnail" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "File" DROP COLUMN "isPublish",
DROP COLUMN "isVerified",
ADD COLUMN     "status" "Status" DEFAULT 'PUBLIC',
ADD COLUMN     "uploadedById" TEXT;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "address",
DROP COLUMN "city",
DROP COLUMN "company_name",
DROP COLUMN "country",
DROP COLUMN "email",
DROP COLUMN "fullname",
DROP COLUMN "phone",
DROP COLUMN "state",
DROP COLUMN "status",
DROP COLUMN "zip_code",
ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "sub_total" SET NOT NULL,
ALTER COLUMN "total" SET NOT NULL;

-- AlterTable
ALTER TABLE "OrderItems" DROP COLUMN "productId",
DROP COLUMN "quantity",
ADD COLUMN     "CourseId" TEXT NOT NULL,
ALTER COLUMN "orderId" SET NOT NULL,
ALTER COLUMN "price" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "aboutInfo" TEXT,
ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "timezone" TEXT,
ADD COLUMN     "zipCode" INTEGER,
ALTER COLUMN "stripe_customerId" SET NOT NULL,
ALTER COLUMN "roleId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "content",
DROP COLUMN "fileId",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "mediaId" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "status" "Status" DEFAULT 'PUBLIC',
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- DropTable
DROP TABLE "Cart";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "CourseSubCategory";

-- DropTable
DROP TABLE "Example";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "ProductCategory";

-- DropTable
DROP TABLE "Wallet";

-- DropTable
DROP TABLE "courseReview";

-- CreateTable
CREATE TABLE "CourseReview" (
    "id" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "comment" TEXT NOT NULL,
    "userId" TEXT,
    "courseId" TEXT,
    "status" "Status" DEFAULT 'PUBLIC',
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "CourseReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Audio" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "courseId" TEXT,
    "mediaId" TEXT,
    "status" "Status" DEFAULT 'PUBLIC',
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Audio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Audio_slug_key" ON "Audio"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Course_slug_key" ON "Course"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "CourseCategory_slug_key" ON "CourseCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Video_slug_key" ON "Video"("slug");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseReview" ADD CONSTRAINT "CourseReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseReview" ADD CONSTRAINT "CourseReview_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_bannerId_fkey" FOREIGN KEY ("bannerId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CourseCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Audio" ADD CONSTRAINT "Audio_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Audio" ADD CONSTRAINT "Audio_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_CourseId_fkey" FOREIGN KEY ("CourseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
