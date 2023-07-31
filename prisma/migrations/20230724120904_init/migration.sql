-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_bannerId_fkey";

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "bannerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_bannerId_fkey" FOREIGN KEY ("bannerId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
