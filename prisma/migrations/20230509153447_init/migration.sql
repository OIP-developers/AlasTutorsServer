/*
  Warnings:

  - You are about to drop the column `sub_categoryId` on the `Category` table. All the data in the column will be lost.
  - Added the required column `name` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_sub_categoryId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "sub_categoryId",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "parent_categoryId" TEXT,
ALTER COLUMN "title" DROP NOT NULL;

-- CreateTable
CREATE TABLE "SliderItem" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "image1" TEXT,
    "image2" TEXT,
    "status" "Status" DEFAULT 'PUBLIC',
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "SliderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Banner" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "image" TEXT,
    "status" "Status" DEFAULT 'PUBLIC',
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Banner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageSize" (
    "id" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "width" TEXT NOT NULL,
    "status" "Status" DEFAULT 'PUBLIC',
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ImageSize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tax" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "status" "Status" DEFAULT 'PUBLIC',
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Tax_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parent_categoryId_fkey" FOREIGN KEY ("parent_categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
