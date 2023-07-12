/*
  Warnings:

  - You are about to drop the column `course` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `subCourseCategoryId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the `SubCourseCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_subCourseCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "SubCourseCategory" DROP CONSTRAINT "SubCourseCategory_courseCategoryId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "course",
DROP COLUMN "subCourseCategoryId",
ADD COLUMN     "courseSubCategoryId" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "SubCourseCategory";

-- CreateTable
CREATE TABLE "CourseSubCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "courseCategoryId" TEXT,

    CONSTRAINT "CourseSubCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CourseSubCategory" ADD CONSTRAINT "CourseSubCategory_courseCategoryId_fkey" FOREIGN KEY ("courseCategoryId") REFERENCES "CourseCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_courseSubCategoryId_fkey" FOREIGN KEY ("courseSubCategoryId") REFERENCES "CourseSubCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
