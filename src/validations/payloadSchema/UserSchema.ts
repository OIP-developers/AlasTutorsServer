import Joi from 'joi';

export const GetSameBusinessUsersByNameDropdownQueryValidationSchema = Joi.object().keys({
  name: Joi.string().min(3).max(50).required(),
}).meta({ className: 'GetSameBusinessUsersByNameDropdownQueryPayloadDTO' });

