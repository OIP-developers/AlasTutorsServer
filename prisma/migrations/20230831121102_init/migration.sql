/*
  Warnings:

  - Added the required column `CONCAT(COALESCE(first_name, ''), COALESCE(middle_name, ''), COALESCE(last_name, ''))` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MedicalCondition" DROP CONSTRAINT "MedicalCondition_studentId_fkey";

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "CONCAT(COALESCE(first_name, ''), COALESCE(middle_name, ''), COALESCE(last_name, ''))" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "MedicalCondition" ADD CONSTRAINT "MedicalCondition_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
