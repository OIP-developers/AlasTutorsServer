import Joi from 'joi';
import { JoiObjectId } from '../validator';
import { JoiLocation } from '../commonSchema';


export const AddRecruitmentInterviewDataValidationSchema = Joi.object().keys({
  jobId : JoiObjectId().required(),
  hosts: Joi.array().items(JoiObjectId()).required(),
  invitedCandidates: Joi.array().items(JoiObjectId()).required(),
  urlCode : Joi.string().required()
}).meta({ className: 'AddRecruitmentInterviewDataPayloadDTO' });

export const ToAndFromTimeDTOValidationSchema = Joi.object().keys({
  fromTime: Joi.date().required(),
  toTime : Joi.date().greater(Joi.ref('fromTime')).required()
  // fromTime: Joi.date().iso().required(),
  // toTime : Joi.date().iso().greater(Joi.ref('fromTime')).required()

}).meta({ className: 'ToAndFromTimeDTOValidationSchemaPayloadDTO' });
