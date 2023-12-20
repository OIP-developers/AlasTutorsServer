import Joi from 'joi';

export const CreateJobValidationSchema = Joi.object().keys({
  jobTitle: Joi.string().optional().min(3).max(50).required(),
  department : Joi.string().optional().min(2).max(50).required(),
  skills: Joi.array().max(50).required(),
  location: Joi.string().optional().allow('').required(),
  startDate: Joi.string().optional().allow('').required(),
  jobType: Joi.string().required().required(),
  salary: Joi.string().required(),
  salaryRate: Joi.string().required(),
  openings: Joi.number().required(),
  jobDescription: Joi.string().required(),
  applicationQuestions: Joi.object({
    isNameRequired: Joi.boolean().required(),
    isEmailRequired: Joi.boolean().required(),
    isPhoneNumberRequired: Joi.boolean().required(),
    isHomeAddressRequired: Joi.boolean().required(),
    isResumeRequired: Joi.boolean().required(),
    isCoverLetterRequired: Joi.boolean().required(),
    isPortfolioLinkRequired: Joi.boolean().required(),
    isApplicationSourceRequired: Joi.boolean().required(),
    enteredQuestions: Joi.array().items(Joi.string()).max(50).required(),
  }).required(),
  enteredInterviewQuestions : Joi.array().items(Joi.string()).max(50).required(),
}).meta({ className: 'CreateJobPayloadDTO' });

