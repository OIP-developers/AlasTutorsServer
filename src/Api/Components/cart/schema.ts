import Joi from 'joi';

export default {
  create: Joi.object().keys({
    productId: Joi.string().required(),
    // quantity: Joi.number().required(),
  })
};
