import { prisma, IPrisma, CourseCategory } from '../../../database';

export const DOCUMENT_NAME = IPrisma.ModelName.CourseCategory;

export default CourseCategory;

export const CourseCategoryModel = prisma.courseCategory;
