import Joi from "joi";

export default {
  create: Joi.object().keys({
    productId: Joi.array().required(),
  }),

  statusUpdate: Joi.object().keys({
    status: Joi.string().required()
  }),

  manufacturerUpdate: Joi.object().keys({
    grossPrice: Joi.number().required(),
    netPrice: Joi.number().required(),
  }),

  employeeUpdate: Joi.object().keys({
    margin: Joi.number().required()
  }),
};