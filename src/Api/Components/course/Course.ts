import { prisma, IPrisma, Course } from '../../../database';

export const DOCUMENT_NAME = IPrisma.ModelName.Course;

export default Course;

export const CourseModel = prisma.course;
