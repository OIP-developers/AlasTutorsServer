import Joi from 'joi';
import { JoiAuthBearer } from '../helpers/validator';
import { RoleCode } from '../database/model/Role';

export const userCredential = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
})

export const refreshToken = Joi.object().keys({
  refreshToken: Joi.string().required().min(1),
})

//  export const jj =   auth: Joi.object()
//         .keys({
//             authorization: JoiAuthBearer().required(),
//         })
//         .unknown(true)

export const signupSchema = Joi.object().keys({
  name: Joi.string().required().min(3),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
  role: Joi.string().required().valid(RoleCode.ADMIN, RoleCode.USER, RoleCode.INSTRUCTOR)
})

export const apiKeySchema = Joi.object().keys({
  'x-api-key': Joi.string().required(),
}).unknown(true)

export const authBearerSchema = Joi.object().keys({
  authorization: JoiAuthBearer().required(),
}).unknown(true)
