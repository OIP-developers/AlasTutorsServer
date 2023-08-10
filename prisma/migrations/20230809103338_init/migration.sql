/*
  Warnings:

  - You are about to drop the column `CourseId` on the `OrderItems` table. All the data in the column will be lost.
  - Added the required column `courseId` to the `OrderItems` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderItems" DROP CONSTRAINT "OrderItems_CourseId_fkey";

-- AlterTable
ALTER TABLE "OrderItems" DROP COLUMN "CourseId",
ADD COLUMN     "courseId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
