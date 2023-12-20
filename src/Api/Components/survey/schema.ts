import Joi from 'joi';
import { JoiObjectId, JoiUrlEndpoint } from '../../../validations/validator';

export default {
  paramsId: Joi.object().keys({
    _id: JoiObjectId().required(),
  }),
  pagination: Joi.object().keys({
    pageNumber: Joi.number().required().integer().min(1),
    pageItemCount: Joi.number().required().integer().min(1),
  }),
  create: Joi.object().keys({
    survey: Joi.any().required(),
    business: Joi.string(),
    name : Joi.string(),
    description: Joi.string(),
    completion: Joi.string(),
    assigned: Joi.array().items(Joi.string())
  }),
};
