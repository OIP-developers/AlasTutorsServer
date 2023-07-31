/*
  Warnings:

  - You are about to drop the column `thumbnail` on the `CourseCategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CourseCategory" DROP COLUMN "thumbnail",
ADD COLUMN     "imageUrl" TEXT;
