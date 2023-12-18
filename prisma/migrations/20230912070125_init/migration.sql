-- CreateEnum
CREATE TYPE "SubjectChoice" AS ENUM ('ENGLISH', 'MATHS', 'FRENCH', 'SCIENCE', 'SPANISH');

-- CreateEnum
CREATE TYPE "WEEK_DAYS" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY');

-- CreateTable
CREATE TABLE "TuitionDetails" (
    "tuitionType" TEXT NOT NULL,
    "subjectChoice" "SubjectChoice" NOT NULL,
    "schoolDayAndTime" TEXT NOT NULL,
    "summerSchoolHalfDay" "WEEK_DAYS" NOT NULL,
    "summerSchoolFullDay" "WEEK_DAYS" NOT NULL,
    "feeSubscrtion" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "TuitionDetails_pkey" PRIMARY KEY ("studentId")
);

-- AddForeignKey
ALTER TABLE "TuitionDetails" ADD CONSTRAINT "TuitionDetails_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
