-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "fileId" TEXT,
ADD COLUMN     "thumbnailId" TEXT;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
