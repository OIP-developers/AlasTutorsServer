import Joi from 'joi';
import { JoiObjectId } from '../validator';
import { JoiLocation } from '../commonSchema';

export const CreateRecruitmentInterviewValidationSchema = Joi.object().keys({
  jobId : JoiObjectId().required(),

  hosts: Joi.array().items(JoiObjectId()).required(),
  invitedCandidates: Joi.array().items(JoiObjectId()).required(),

  fromTime: Joi.date().iso().required(),
  toTime : Joi.date().iso().greater(Joi.ref('fromTime')).required()

}).meta({ className: 'CreateRecruitmentInterviewPayloadDTO' });

export const recruitmentInterviewDBDataVaidationSchema = Joi.object({
  jobId: JoiObjectId().required(),
  hosts: Joi.array().items(JoiObjectId().required()).required(),
  invitedCandidates: Joi.array().items(JoiObjectId().required()).required(),
  urlCode: Joi.string().required(),
}).meta({ className: 'RecruitmentInterviewDBDataVaidationSchemaDTO' });;
