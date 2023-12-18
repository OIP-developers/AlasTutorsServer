/*
  Warnings:

  - You are about to drop the column `feeSubscrtion` on the `TuitionDetails` table. All the data in the column will be lost.
  - Added the required column `feeSubscription` to the `TuitionDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TuitionDetails" DROP COLUMN "feeSubscrtion",
ADD COLUMN     "feeSubscription" TEXT NOT NULL;
