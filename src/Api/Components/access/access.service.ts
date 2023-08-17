import { BadRequestError } from '../../../core/ApiError';
import UserRepo from './user.repository'
import User, { DOCUMENT_NAME as USER_DOCUMENT_NAME } from "./User"
import { generateTokenKey } from '../../../helpers/tokenKeyGenerator';
import { createTokens } from '../../../utils/authUtils';
import Address, { AddressModel } from './Address';
import Guardian, { GuardianModel } from "./Guardian"
import MedicalCondition, { MedicalConditionModel } from "./MedicalCondition"
import EmergencyContact, { EmergencyContactModel } from "./EmergencyContact";
interface ParentAddress {
  address: Address
}

export class AccessService {

  async createParent(userData: User & ParentAddress, emergencyContact: EmergencyContact) {
    const accessTokenKey = generateTokenKey();
    const refreshTokenKey = generateTokenKey();
    const { address, ...parentData } = userData;
    const { user, keystore } = await UserRepo.create(
      parentData,
      accessTokenKey,
      refreshTokenKey,
      "PARENT",
    );
    if (!user) throw new BadRequestError('Parent creation field!');
    const tokens = await createTokens(user, keystore.primaryKey, keystore.secondaryKey);

    //creating parent address
    const parentAddress = await AddressModel.create({
      data: {
        ...address,
        userId: user.id
      }
    });
    if (!parentAddress) {
      throw new BadRequestError('Address creation field!');
    }
    const emContact = await EmergencyContactModel.create({
      data: {
        ...emergencyContact,
        userId: user.id
      }
    });

    if (!emContact) throw new BadRequestError('Emergency Contact creation field!');

    return { user, tokens }
  }

  async createStudent(userData: User, medicalCondition: MedicalCondition | null, parentId: string) {
    const accessTokenKey = generateTokenKey();
    const refreshTokenKey = generateTokenKey();

    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = Array.from({ length:8 }, () => charset[Math.floor(Math.random() * charset.length)]).join('');
    
    const data = {
      ...userData,
      stripe_customerId: "",
      email: `${parentId}.${userData.first_name}`, // auto generated for student
      password,
      parentId,
    };

    if (userData.dateOfBirth) {
      data.dateOfBirth = new Date(userData.dateOfBirth);
    }

    const { user, keystore } = await UserRepo.create(
      data,
      accessTokenKey,
      refreshTokenKey,
      "STUDENT",
    );
    if (!user) throw new BadRequestError('Student creation field!');
    const tokens = await createTokens(user, keystore.primaryKey, keystore.secondaryKey);

    if (medicalCondition) {
      const medical = await MedicalConditionModel.create({
        data: {
          ...medicalCondition,
          userId: user.id
        }
      })
      if (!medical) throw new BadRequestError('Medical condition creation field!');
    }
    return { user, tokens }
  }

  async createGuardians(guardians: Guardian[]) {
    const createdGuardians = await GuardianModel.createMany({ data: guardians });
    if (!createdGuardians) throw new BadRequestError('Guardians creation field!');
    return { guardians: createdGuardians }
  }

}