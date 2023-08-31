import { Prisma, RoleCode } from '@prisma/client';
import StudentRepository, { StudentWhereQuery, Student } from './student.repository';
import { BadRequestError } from '../../../core/ApiError';
import { MedicalCondition } from '@prisma/client';
export class StudentService {
  
  private readonly studentRepo: StudentRepository = new StudentRepository();

  async findStudents(role: RoleCode, studentId: string | undefined, userId: string, query: { search?: string, limit?: string, page?: string }) {
    const where: StudentWhereQuery = {};

    if (role === "PARENT") {
      where.parentId = userId;
    }

    if (studentId) {
      where.id = studentId;
    }
    const data = await this.studentRepo.findStudents({
      where,
      ...query
    });

    return data;
  };

  async createStudent(role: RoleCode, userId: string, studentData: Student, medicalCondition: MedicalCondition) {
    if (role === "PARENT") {
      const student = await this.studentRepo.create<Prisma.StudentUncheckedCreateInput, Prisma.StudentInclude>({

        data: {
          ...studentData, parentId: userId, medicalCondition: {
            create: {
              ...medicalCondition
            }
          }
        },
        include: {
          medicalCondition: true
        }
      });
      return { student };
    } else {
      throw new BadRequestError("Invalid role")
    }



  };

  async updateStudent(studentId: string, role: RoleCode, userId: string, studentData: Student, medicalCondition: MedicalCondition) {
    if (role === "PARENT") {
      await this.studentRepo.findOneOrThrow({
        where: { id: studentId, parentId: userId }, include: {
          medicalCondition: true
        }
      });
    } else {
      throw new BadRequestError("Invalid role")
    }

    const student = await this.studentRepo.update(
      {
        where: { id: studentId },
        data: {
          ...studentData, medicalCondition: {
            update: {
              ...medicalCondition
            },
          }
        },
        include: {
          parent: false,
          medicalCondition: true
        },
      });
    return student;
  };
  async deleteStudent(studentId: string, role: RoleCode, userId: string) {

    if (role === "PARENT") {
      await this.studentRepo.findOneOrThrow({
        where: { id: studentId, parentId: userId }, include: {
          parent: false,
          medicalCondition: true
        }
      });
    } else {
      throw new BadRequestError("Invalid role")
    }

    const student = await this.studentRepo.delete({ where: { id: studentId }, include: { parent: false } })
    return student;

  };
}