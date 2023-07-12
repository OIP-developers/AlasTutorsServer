// import { BadRequestError } from '../../../core/ApiError';
// import UserRepo from './user.repository'
// import ReviewRepo from '../ride/review.repository'
// import User, { DOCUMENT_NAME as USER_DOCUMENT_NAME } from "./User"
// import Logger from '../../../core/Logger';

// export class AccessService {
//   async findReferCode(referId: User['referCode']): Promise<User | null> {
//     const findUser = await UserRepo.findOne({ where: { referCode: referId } })
//     return findUser
//   }

//   async getAverageRating(driverId: string): Promise<number> {
//     const ratings = await ReviewRepo.find({ where: { driverId } })
//     if (ratings) {
//       if (!ratings.length) {
//         return 0;
//       }
//     } else {
//       throw new BadRequestError('review empty')
//     }
//     //@ts-ignore
//     const sum = ratings.reduce((acc, star) => acc + star.rating, 0);
//     const avg = sum / ratings.length;
//     return avg;

//   }
// }