import Joi from 'joi';

export default {
  create: Joi.object().keys({
    company_name: Joi.string().required().min(3).max(20),
    fullname: Joi.string().required().min(3).max(20),
    email: Joi.string().required().email(),
    phone: Joi.number().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zip_code: Joi.string().required(),
    country: Joi.string().required(),
    sub_total: Joi.number().required(),
    total: Joi.number().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
    productId: Joi.string().required()
  }),
  status: Joi.object().keys({
    status: Joi.string().valid('PUBLIC', 'PRIVATE','DRAFT').required(),
  }),
};
