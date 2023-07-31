-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_thumbnailId_fkey";

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "thumbnailId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
