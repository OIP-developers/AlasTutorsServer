import { prisma, IPrisma, CourseReview} from '../../../../database';

export const DOCUMENT_NAME = IPrisma.ModelName.CourseReview;

export default CourseReview;

export const CourseReviewModel = prisma.courseReview;