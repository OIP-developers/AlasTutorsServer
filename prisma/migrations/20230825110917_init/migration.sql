/*
  Warnings:

  - You are about to drop the column `firstName` on the `EmergencyContact` table. All the data in the column will be lost.
  - You are about to drop the column `gpName` on the `EmergencyContact` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `EmergencyContact` table. All the data in the column will be lost.
  - The primary key for the `Guardian` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `MedicalCondition` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `MedicalCondition` table. All the data in the column will be lost.
  - You are about to drop the column `isPromotionAllowed` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isSpecialEducationNeeds` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `User` table. All the data in the column will be lost.
  - Added the required column `city` to the `EmergencyContact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `EmergencyContact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emergency_phone` to the `EmergencyContact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `EmergencyContact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gp_name` to the `EmergencyContact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `EmergencyContact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `line1` to the `EmergencyContact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `EmergencyContact` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Guardian` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `studentId` to the `MedicalCondition` table without a default value. This is not possible if the table is not empty.
  - Made the column `isMedicalConditions` on table `MedicalCondition` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "MedicalCondition" DROP CONSTRAINT "MedicalCondition_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_parentId_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "line2" DROP NOT NULL;

-- AlterTable
ALTER TABLE "EmergencyContact" DROP COLUMN "firstName",
DROP COLUMN "gpName",
DROP COLUMN "lastName",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "emergency_phone" TEXT NOT NULL,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "gp_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "line1" TEXT NOT NULL,
ADD COLUMN     "line2" TEXT,
ADD COLUMN     "postalCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Guardian" DROP CONSTRAINT "Guardian_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Guardian_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "MedicalCondition" DROP CONSTRAINT "MedicalCondition_pkey",
DROP COLUMN "userId",
ADD COLUMN     "studentId" TEXT NOT NULL,
ALTER COLUMN "isMedicalConditions" SET NOT NULL,
ADD CONSTRAINT "MedicalCondition_pkey" PRIMARY KEY ("studentId");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isPromotionAllowed",
DROP COLUMN "isSpecialEducationNeeds",
DROP COLUMN "parentId";

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "yearGroup" TEXT NOT NULL,
    "isPromotionAllowed" BOOLEAN NOT NULL DEFAULT false,
    "isSpecialEducationNeeds" BOOLEAN NOT NULL DEFAULT false,
    "isSiblingEnrolled" BOOLEAN NOT NULL DEFAULT false,
    "sibling_first_name" TEXT,
    "sibling_last_name" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "parentId" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sequence" (
    "id" TEXT NOT NULL,
    "users" INTEGER NOT NULL,
    "students" INTEGER NOT NULL,

    CONSTRAINT "Sequence_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MedicalCondition" ADD CONSTRAINT "MedicalCondition_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
