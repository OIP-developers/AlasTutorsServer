/*
  Warnings:

  - You are about to drop the column `about` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `discussion` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "about",
DROP COLUMN "discussion";
