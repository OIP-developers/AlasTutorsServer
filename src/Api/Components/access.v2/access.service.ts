import User from "./User"
import { Address, Guardian, MedicalCondition, EmergencyContact, Student } from "@prisma/client";
import UserRepository from './user.repository';
import bcrypt from 'bcrypt';
import { RoleModel } from "../roles/Role";
import slugify from "slugify";

interface ParentAddress {
  address: Address
}

interface StudentMedicalCondition {
  medicalCondition: MedicalCondition
}

export class AccessService {

  private readonly userRepository = new UserRepository();

  async createParentUser(userData: User & ParentAddress, emergencyContact: EmergencyContact, students: Student[] & StudentMedicalCondition, guardians: Guardian) {
    const { address, ...parentData } = userData;

    const role = await RoleModel.findUniqueOrThrow({ where: { code: "PARENT" } });
    const password = bcrypt.hashSync(parentData.password, 10);

    let username = (`${parentData.first_name}.${parentData.last_name}`).toLowerCase().replace(/[^a-zA-Z0-9]/g, '');

    //to generate a unique username
    const userCount = await this.userRepository.count({ where: {} });
    username = username.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
    username = `${username}.${userCount}`;
    parentData.username = slugify(username);

    const allStudents = students.map((stu: any) => {
      const { medicalCondition, ...studentData } = stu;
      studentData.dateOfBirth = new Date(studentData.dateOfBirth);
      return {
        ...studentData,
        medicalCondition: {
          create: {
            ...medicalCondition
          }
        }
      }
    })

    const user = await this.userRepository.create({
      data: {
        ...parentData,
        password,
        roleId: role.id,
        address: {
          create: address
        },
        emergencyContact: {
          create: emergencyContact
        },
        childs: {
          create: allStudents
        },
        guardians: {
          create: guardians
        }
      },
      include: {
        address: true,
        emergencyContact: true,
        childs: true,
        guardians: true,
      }
    })
    console.log(user)
    return user;
  }



}