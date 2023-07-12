// import { Router, Request } from 'express';
// import UserRepo from '../Api/Components/access/user.repository';
// import { AuthFailureError } from '../core/ApiError';
// import validator, { ValidationSource } from '../helpers/validator';
// import { firebaseBearerSchema } from '../utils/joi.schema';
// import asyncHandler from '../helpers/async';

// const router = Router();

// export default router.use(
//   validator(firebaseBearerSchema, ValidationSource.HEADER),
//   asyncHandler(async (req: any, res, next) => {  

//     const firebase_uuid = req.headers['firebase-uuid'];

//     const user = await UserRepo.findByFirebaseId(firebase_uuid);
//     if (!user) throw new AuthFailureError('User not registered in firebase db!');
      
//     req.user = user;
//     return next();
//   }),
// );
