import Joi from 'joi';
import { JoiObjectId, JoiUrlEndpoint } from '../../../../validations/validator';

export default {
  paramsId: Joi.object().keys({
    _id: JoiObjectId().required(),
  }),
  create: Joi.object().keys({
    name: Joi.string(),
    logo: Joi.string(),
    email: Joi.string().allow(""),
    website: Joi.string().allow(""),
    location: Joi.string().allow(""),
    facebook_link: Joi.string().allow(""),
    linkedin_link: Joi.string().allow(""),
    instagram_link: Joi.string().allow(""),
    twitter_link: Joi.string().allow("")
  }),
};
