import Joi from 'joi';

export const CreateJobTypeValidationSchema = Joi.object().keys({
  name: Joi.string().min(1).max(50).required(),
}).meta({ className: 'CreateJobTypePayloadDTO' });

