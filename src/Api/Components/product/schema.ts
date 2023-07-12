import Joi from 'joi';

export default {
  create: Joi.object().keys({
    title: Joi.string().required().min(3).max(20),
    desc: Joi.string().required().min(3),
    price: Joi.number().required(),
    featured_image: Joi.string().required().uri(),
    categories: Joi.array().required()
  }),
};
