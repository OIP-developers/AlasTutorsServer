/*
  Warnings:

  - The `quantity` column on the `Cart` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "quantity",
ADD COLUMN     "quantity" INTEGER;
