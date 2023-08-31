import { Prisma, RoleCode } from '@prisma/client';
import StudentRepository, { StudentWhereQuery, Student } from './student.repository';
import MedicalConditionRepository, { MedicalCondition } from './medicalCondition/medicalCondition.repository';
import { BadRequestError } from '../../../core/ApiError';

export class StudentService {
  private readonly studentRepo: StudentRepository = new StudentRepository();
  private readonly medicalConditionRepo = new MedicalConditionRepository();

  async findStudents(role: RoleCode, studentId: string | undefined, userId: string , query:{search?:string, limit?:string, page?:string}) {
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
        data: { ...studentData, parentId: userId },
        include: {
          parent: false
        }
      });
      console.log(student, "Student")
      let mCond: any = {}
      if (medicalCondition) {
        mCond = await this.medicalConditionRepo.create({
          data: {
            ...medicalCondition,
            //@ts-ignore
            studentId: student.id
          },
          include: {
            student: false
          }
        })
      }
      //@ts-ignore
      student.medicalCondition = mCond;
      return { student };
    } else {
      throw new BadRequestError("Invalid role")
    }



  };

  async updateStudent(studentId: string, role: RoleCode, userId: string, studentData: Student, medicalCondition: MedicalCondition) {

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

    if (medicalCondition) {
      await this.medicalConditionRepo.upsert({ create: {...medicalCondition , studentId}, update: medicalCondition, where: { studentId } });
    }

    const student = await this.studentRepo.update(
      {
        where: { id: studentId },
        data: { ...studentData },
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

  async queryStudent(query:string) {

  };
}