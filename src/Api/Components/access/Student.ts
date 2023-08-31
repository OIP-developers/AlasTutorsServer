import { prisma, IPrisma, User , Student} from './../../../database';

export const DOCUMENT_NAME = IPrisma.ModelName.Student;
export const COLLECTION_NAME = 'student';

export default Student;

export const StudentModel = prisma.student;
