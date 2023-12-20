import Joi from 'joi';
import { JoiObjectId } from '../../../validations/validator';

export default {
  paramsId: Joi.object().keys({
    _id: JoiObjectId().required(),
  }),
  pagination: Joi.object().keys({
    pageNumber: Joi.number().required().integer().min(1),
    pageItemCount: Joi.number().required().integer().min(1),
  }),
  create: Joi.object().keys({
    workspace: Joi.string().required(),
    question: Joi.string().required(),
    allow: Joi.boolean().optional(),
    answers: Joi.array().required(),
  }),
  createFolder: Joi.object().keys({
    name: Joi.string().required(),
    workspace: Joi.string().required(),
  }),
  createFile: Joi.object().keys({
    name: Joi.string().required(),
    url: Joi.string().required(),
    size: Joi.number().required(),
    type: Joi.string().required(),
    folder: Joi.string().required(),
    workspace: Joi.string().required(),
  }),
};
