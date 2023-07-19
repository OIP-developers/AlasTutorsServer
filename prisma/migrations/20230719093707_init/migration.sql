-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "fileId" TEXT;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
