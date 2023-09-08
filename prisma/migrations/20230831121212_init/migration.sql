/*
  Warnings:

  - You are about to drop the column `CONCAT(COALESCE(first_name, ''), COALESCE(middle_name, ''), COA` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "CONCAT(COALESCE(first_name, ''), COALESCE(middle_name, ''), COA";
