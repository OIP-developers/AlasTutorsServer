import Joi from 'joi';

export const CreateSalaryFrequencyValidationSchema = Joi.object().keys({
  name: Joi.string().min(1).max(50).required(),
}).meta({ className: 'CreateSalaryFrequencyPayloadDTO' });

