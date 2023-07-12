/*
  Warnings:

  - The values [ADMIN,STORE_ADMIN,STORE_PRODUCT_MANAGER,STORE_ORDER_MANAGER] on the enum `RoleCode` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Banner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ImageSize` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SliderItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tax` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RoleCode_new" AS ENUM ('ADMIN', 'USER');
ALTER TABLE "Role" ALTER COLUMN "code" TYPE "RoleCode_new" USING ("code"::text::"RoleCode_new");
ALTER TYPE "RoleCode" RENAME TO "RoleCode_old";
ALTER TYPE "RoleCode_new" RENAME TO "RoleCode";
DROP TYPE "RoleCode_old";
COMMIT;

-- DropTable
DROP TABLE "Banner";

-- DropTable
DROP TABLE "ImageSize";

-- DropTable
DROP TABLE "SliderItem";

-- DropTable
DROP TABLE "Tax";
