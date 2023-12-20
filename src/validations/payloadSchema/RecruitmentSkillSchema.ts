import Joi from 'joi';

export const CreateRecruitmentSkillValidationSchema = Joi.object().keys({
  skillNames : Joi.array().items(Joi.string()).max(50).required(),
}).meta({ className: 'CreateRecruitmentSkillPayloadDTO' });

