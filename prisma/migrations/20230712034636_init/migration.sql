/*
  Warnings:

  - You are about to drop the column `category` on the `CourseCategory` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `SubCourseCategory` table. All the data in the column will be lost.
  - Added the required column `name` to the `CourseCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `SubCourseCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CourseCategory" DROP COLUMN "category",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SubCourseCategory" DROP COLUMN "category",
ADD COLUMN     "name" TEXT NOT NULL;
