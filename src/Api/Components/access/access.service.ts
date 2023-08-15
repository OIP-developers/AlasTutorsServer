// import { BadRequestError } from '../../../core/ApiError';
// import UserRepo from './user.repository'
// import User, { DOCUMENT_NAME as USER_DOCUMENT_NAME } from "./User"
// import Logger from '../../../core/Logger';
// import { generateTokenKey } from '../../../helpers/tokenKeyGenerator';
// import { createTokens } from '../../../utils/authUtils';
// import { Gender, RoleCode } from '@prisma/client';

// interface StudentParams {
//   firstName: string
//   middleName: string
//   lastName: string
//   gender: Gender
//   dateOfBirth: Date
//   yearGroup: string
// }

// export class AccessService {

//   async createUser({ body, role }: { body: StudentParams, role: RoleCode }) {
//     const accessTokenKey = generateTokenKey();
//     const refreshTokenKey = generateTokenKey();

//     const { user: createdUser, keystore } = await UserRepo.create(
//       {
//         first_name: body.firstName,
//         last_name: body.lastName,
//         gender: body.gender,
//         dateOfBirth: body.dateOfBirth,
//         yearGroup: body.yearGroup
//       },
//       accessTokenKey,
//       refreshTokenKey,
//       'STUDENT',
//     );
//     if (!createdUser) throw new BadRequestError('User creation field!');
//     const tokens = await createTokens(createdUser, keystore.primaryKey, keystore.secondaryKey);
//   }

// }