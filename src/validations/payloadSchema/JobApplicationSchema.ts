import Joi from 'joi';
import { JoiObjectId } from '../validator';
import { JoiLocation } from '../commonSchema';

export const CreateCulturefyJobApplicationValidationSchema = Joi.object().keys({
  applicantName: Joi.string().optional().min(3).max(50).required(),
  jobId : JoiObjectId().required(),
  email: Joi.string().email().max(50).required(),
  phoneNumber: Joi.string().optional().allow('').required(),
  location : JoiLocation().required(),
  coverLetter: Joi.string().max(100000).required(),
  resume: Joi.string().uri().required(),
}).meta({ className: 'CreateCulturefyJobApplicationPayloadDTO' });

export const GetDropdownJobApplicantsByJobIdParamsValidationSchema = Joi.object().keys({
  jobId : JoiObjectId().required(),
}).meta({ className: 'GetDropdownJobApplicantsByJobIdParamsPayloadDTO' });

export const GetDropdownJobApplicantsByJobIdQueryValidationSchema = Joi.object().keys({
  applicantName: Joi.string().optional().max(50),
}).meta({ className: 'GetDropdownJobApplicantsByJobIdQueryPayloadDTO' });
