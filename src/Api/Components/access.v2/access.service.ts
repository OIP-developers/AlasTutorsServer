import User from "./User"
import { Address, Guardian, MedicalCondition, EmergencyContact, Student, Prisma } from "@prisma/client";
import UserRepository from './user.repository';
import bcrypt from 'bcrypt';
import slugify from "slugify";
import RoleRepo from "../roles/role.repository";
import { BadRequestError } from "../../../core/ApiError";
import { comparePassword } from "../../../utils/password";
import { generateTokenKey } from "../../../helpers/tokenKeyGenerator";
import { createTokens } from "../../../utils/authUtils";
import KeystoreRepo from "./keystore.repository";

interface ParentAddress {
  address: Address
}

interface StudentMedicalCondition {
  medicalCondition: MedicalCondition
}

export class AccessService {


  async createParentUser(userData: User & ParentAddress, emergencyContact: EmergencyContact, students: Student[] & StudentMedicalCondition, guardians: Guardian) {
    const { address, ...parentData } = userData;
    //@ts-ignore TODO:REMOVE THIS TS IGNORE
    const role = await RoleRepo.findByCode("PARENT");
    const password = bcrypt.hashSync(parentData.password, 10);

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

    const user = await UserRepository.create({
      ...parentData,
      password,
      roleId: role.id,
      address: {
        create: address
      },
      emergencyContact: {
        create: emergencyContact
      },
      students: {
        create: allStudents
      },
      guardians: {
        create: guardians
      }
    })
    return user;
  }

  async userLogin(email: string, password: string) {

    const user = await UserRepository.findByEmail(email , true);

    if (!user) throw new BadRequestError('Invalid credentials');
    if (!user.password) throw new BadRequestError('Credential not set');
    if (!user.status) throw new BadRequestError('User InActive');


    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      throw new BadRequestError('Invalid credentials!');
    }

    const accessTokenKey = generateTokenKey();
    const refreshTokenKey = generateTokenKey();
    await KeystoreRepo.create(user.id, accessTokenKey, refreshTokenKey);
    const tokens = await createTokens(user, accessTokenKey, refreshTokenKey);

    const userClone =  structuredClone(user)
    //@ts-ignore
    delete userClone.password
    
    return { tokens, user:userClone }
  }
}