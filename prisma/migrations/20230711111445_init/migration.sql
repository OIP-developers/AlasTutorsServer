-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "subCourseCategoryId" TEXT;

-- CreateTable
CREATE TABLE "CourseCategory" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "CourseCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubCourseCategory" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "courseCategoryId" TEXT,

    CONSTRAINT "SubCourseCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubCourseCategory" ADD CONSTRAINT "SubCourseCategory_courseCategoryId_fkey" FOREIGN KEY ("courseCategoryId") REFERENCES "CourseCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_subCourseCategoryId_fkey" FOREIGN KEY ("subCourseCategoryId") REFERENCES "SubCourseCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
