-- CreateTable
CREATE TABLE "courseReview" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "courseSubCategoryId" TEXT,
    "review" DOUBLE PRECISION NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "courseReview_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "courseReview" ADD CONSTRAINT "courseReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courseReview" ADD CONSTRAINT "courseReview_courseSubCategoryId_fkey" FOREIGN KEY ("courseSubCategoryId") REFERENCES "CourseSubCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
