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
    title: Joi.string().required(),
    number_of_lessons: Joi.number().required(),
    duration: Joi.string().required(),
    instructor: Joi.string().required(),
    thumbnail: Joi.string().required(),
    attachment: Joi.array(),
    details: Joi.string().required(),
    isPublish: Joi.boolean(),
    status: Joi.string()
  }),
};
