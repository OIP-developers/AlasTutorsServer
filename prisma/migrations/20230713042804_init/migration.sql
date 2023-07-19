/*
  Warnings:

  - You are about to drop the column `courseSubCategoryId` on the `courseReview` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "courseReview" DROP CONSTRAINT "courseReview_courseSubCategoryId_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "about" TEXT,
ADD COLUMN     "discussion" TEXT;

-- AlterTable
ALTER TABLE "courseReview" DROP COLUMN "courseSubCategoryId",
ADD COLUMN     "courseId" TEXT;

-- AddForeignKey
ALTER TABLE "courseReview" ADD CONSTRAINT "courseReview_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
