import Joi from "joi";
import { GeoJSONObjectTypes } from '../enums/enums';
import { JoiNullableObjectId, JoiObjectId, JoiStringifiedObjectId } from './validator';


export const JoiLocation = () =>{

  return Joi.object({
  type: Joi.string().valid(GeoJSONObjectTypes.point).allow(null).required(),
  coordinates: Joi.array().ordered(
    Joi.number().min(-180).max(180).allow(null).required(),
    Joi.number().min(-90).max(90).allow(null).required()
  ).required(),
  formattedAddress: Joi.string().allow(null).required(),
  street: Joi.string().allow(null).max(1000).required(),
  zipcode: Joi.number().allow(null).min(0).max(99999).required(),
  cityId: JoiNullableObjectId().required(),
  stateId: JoiNullableObjectId().required(),
  countryId: JoiNullableObjectId().required(),
  }).custom((value: string, helpers)=>{
    return value
  })
}

export const CreatedByAndBusinessIdValidationSchema = Joi.object().keys({
  createdBy: JoiStringifiedObjectId().required(),
  businessId : JoiStringifiedObjectId().required(),

}).meta({ className: 'CreatedByAndBusinessIdValidationSchemaDTO' });
