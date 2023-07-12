/*
  Warnings:

  - You are about to drop the column `Description` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `courseName` on the `Course` table. All the data in the column will be lost.
  - Added the required column `course` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "Description",
DROP COLUMN "courseName",
ADD COLUMN     "course" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL;
