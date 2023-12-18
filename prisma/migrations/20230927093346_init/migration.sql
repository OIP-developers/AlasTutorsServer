/*
  Warnings:

  - The values [STUDENT,PARENT] on the enum `RoleCode` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "WORK_DAYS" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'EVERY_DAY');

-- CreateEnum
CREATE TYPE "EmploymentPostion" AS ENUM ('ENGLISH_TEACHER', 'MATHS_TEACHER', 'SCIENCE_TEACHER', 'LANGUAGE_TEACHER', 'OTHER');

-- CreateEnum
CREATE TYPE "ProofOfRightToWork" AS ENUM ('PRE_SETTLED_STATUS', 'SETTLED_STATUS', 'BRITISH_PASSPORT');

-- AlterEnum
BEGIN;
CREATE TYPE "RoleCode_new" AS ENUM ('ADMIN', 'TEACHER', 'CONSUMER');
ALTER TABLE "Role" ALTER COLUMN "code" TYPE "RoleCode_new" USING ("code"::text::"RoleCode_new");
ALTER TYPE "RoleCode" RENAME TO "RoleCode_old";
ALTER TYPE "RoleCode_new" RENAME TO "RoleCode";
DROP TYPE "RoleCode_old";
COMMIT;

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "state" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "preffered_name" TEXT,
ADD COLUMN     "title" TEXT;

-- CreateTable
CREATE TABLE "AvaiableForWorkDays" (
    "id" TEXT NOT NULL,
    "day" "WORK_DAYS" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AvaiableForWorkDays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EduicationLevelTeach" (
    "id" TEXT NOT NULL,
    "day" "WORK_DAYS" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "EduicationLevelTeach_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmploymentApplication" (
    "position" "EmploymentPostion" NOT NULL DEFAULT 'ENGLISH_TEACHER',
    "subject" TEXT,
    "nationalInsuranceNumber" TEXT,
    "isRightToWorkInUK" BOOLEAN NOT NULL,
    "isFullyQualified" BOOLEAN NOT NULL,
    "proofOfRightToWork" "ProofOfRightToWork" NOT NULL,
    "teacherId" TEXT NOT NULL,

    CONSTRAINT "EmploymentApplication_pkey" PRIMARY KEY ("teacherId")
);

-- AddForeignKey
ALTER TABLE "AvaiableForWorkDays" ADD CONSTRAINT "AvaiableForWorkDays_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EduicationLevelTeach" ADD CONSTRAINT "EduicationLevelTeach_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmploymentApplication" ADD CONSTRAINT "EmploymentApplication_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
