/*
  Warnings:

  - You are about to drop the column `aboutInfo` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isAccepted` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `middleName` on the `User` table. All the data in the column will be lost.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "EmailStatus" AS ENUM ('VERIFIED', 'PENDING', 'BLOCK', 'WRONG');

-- CreateEnum
CREATE TYPE "GuardianType" AS ENUM ('MOTHER', 'FATHER', 'OTHER');

-- AlterEnum
ALTER TYPE "Gender" ADD VALUE 'NON_BINARY';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "aboutInfo",
DROP COLUMN "isAccepted",
DROP COLUMN "isActive",
DROP COLUMN "isDeleted",
DROP COLUMN "isVerified",
DROP COLUMN "middleName",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "emailStatus" "EmailStatus" DEFAULT 'PENDING',
ADD COLUMN     "isPromotionAllowed" BOOLEAN DEFAULT false,
ADD COLUMN     "isSpecialEducationNeeds" BOOLEAN DEFAULT false,
ADD COLUMN     "middle_name" TEXT,
ADD COLUMN     "parentId" TEXT,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "username" SET NOT NULL,
ALTER COLUMN "phone_status" DROP NOT NULL,
ALTER COLUMN "phone_status" SET DEFAULT 'PENDING',
ALTER COLUMN "stripe_customerId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "EmergencyContact" (
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "gpName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "EmergencyContact_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "MedicalCondition" (
    "isMedicalConditions" BOOLEAN DEFAULT false,
    "typeOfCondition" TEXT,
    "medicationGiven" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "MedicalCondition_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Guardian" (
    "first_name" TEXT,
    "middle_name" TEXT,
    "last_name" TEXT,
    "type" "GuardianType" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Guardian_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "EmergencyContact" ADD CONSTRAINT "EmergencyContact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalCondition" ADD CONSTRAINT "MedicalCondition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guardian" ADD CONSTRAINT "Guardian_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
