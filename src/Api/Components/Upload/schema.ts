import Joi from 'joi';

export default {
  fileUpload: Joi.object().keys({
    file: Joi.string().required(),
  })
};
