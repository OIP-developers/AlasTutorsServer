import Joi from 'joi';
import { JoiObjectId, JoiUrlEndpoint } from '../../../validations/validator';

export default {
  paramsId: Joi.object().keys({
    _id: JoiObjectId().required(),
  }),
  create: Joi.object().keys({
    title: Joi.string().required(),
  }),
};
