import Joi from 'joi';
import { JoiAuthBearer, JoiUrlEndpoint } from '../helpers/validator';

export const userCredential = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
})

export const refreshToken = Joi.object().keys({
  refreshToken: Joi.string().required().min(1),
})

export const verifyPassword = Joi.object().keys({
  password: Joi.string().required().min(6),
})

//  export const jj =   auth: Joi.object()
//         .keys({
//             authorization: JoiAuthBearer().required(),
//         })
//         .unknown(true)

export const signupSchema = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  phone: Joi.string().required(),
  dateOfBirth: Joi.string().optional(),
  gender: Joi.string().optional(),
  referCode: Joi.string().optional(),
  // role: Joi.string().valid('ADMIN', 'USER').required(),
})

export const driverSignupSchema = Joi.object().keys({
  // username: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  profile_picture: JoiUrlEndpoint().optional(),
  dateOfBirth: Joi.date().required(),
  gender: Joi.string().required(),
})

export const employeeUpdateSchema = Joi.object().keys({
  password: Joi.any().optional(),
  first_name: Joi.string().optional(),
  last_name: Joi.string().optional(),
  email: Joi.string().optional().email(),
  phone: Joi.string().optional(),
  batchId: Joi.string().optional(),
  profile_picture: JoiUrlEndpoint().optional(),
  gender: Joi.string().optional(),
  role: Joi.string().optional(),
  image: Joi.string().optional(),
  status: Joi.boolean().optional(),
})

export const apiKeySchema = Joi.object().keys({
  'x-api-key': Joi.string().required(),
}).unknown(true)

export const authBearerSchema = Joi.object().keys({
  authorization: JoiAuthBearer().required(),
}).unknown(true)

