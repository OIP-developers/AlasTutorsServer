/*
  Warnings:

  - You are about to drop the column `parent_categoryId` on the `Category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_parent_categoryId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "parent_categoryId";
