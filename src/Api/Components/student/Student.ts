import { Prisma, Student } from '@prisma/client';
import { prisma } from "../../../database";

export const StudentModel = prisma.student;

type StudentWhereQuery = Prisma.StudentWhereInput;
type StudentUpdateQuery = Prisma.StudentWhereUniqueInput


export {
  Student,
  StudentWhereQuery,
  StudentUpdateQuery
}
