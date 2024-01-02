import Joi from 'joi';
import { JoiObjectId, JoiUrlEndpoint } from '../../../helpers/validator';

export default {
  paramsId: Joi.object().keys({
    _id: JoiObjectId().required(),
  }),
  pagination: Joi.object().keys({
    pageNumber: Joi.number().required().integer().min(1),
    pageItemCount: Joi.number().required().integer().min(1),
  }),
  create: Joi.object().keys({

    url: Joi.string().required(),



  }),
};
