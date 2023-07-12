/*
  Warnings:

  - You are about to drop the column `image` on the `CourseCategory` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `CourseSubCategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CourseCategory" DROP COLUMN "image",
ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "CourseSubCategory" DROP COLUMN "image",
ADD COLUMN     "imageUrl" TEXT;
