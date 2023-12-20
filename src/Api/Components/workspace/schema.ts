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
    name: Joi.string(),
    description: Joi.string(),
    goalTask: Joi.string().required(),
    hosts: Joi.array().items(Joi.string()).required(),
    listeners: Joi.array().items(Joi.string()),
    startDate: Joi.string(),
    endDate: Joi.string(),
    startTime: Joi.string(),
    endTime: Joi.string(),
  }),
  createFolder: Joi.object().keys({
    name: Joi.string().required(),
    workspace: Joi.string().required(),
  }),
  favoriteFolder: Joi.object().keys({
    folder: Joi.string().required(),
  }),
  favoriteFile: Joi.object().keys({
    folder: Joi.string().required(),
    file: Joi.string().required()
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
