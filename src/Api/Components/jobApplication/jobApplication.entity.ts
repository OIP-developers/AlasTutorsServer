import mongoose, { model, Schema, Document, Date } from 'mongoose';
import { USER_COLLECTION_NAME, User } from "../../../database/model/User"
import { GeoJSONObjectTypes, JobApplicationStatus } from '../../../enums/enums';
import { ObjectId } from '../../../../constants';
import {  ILocation, LocationDTO } from '../../../dto/location.dto';
import { JOB_COLLECTION_NAME } from '../job/job.entity';
import { BUSINESS_COLLECTION_NAME } from '../business/business';
import Business from '../business/business';
import { CITY_COLLECTION_NAME } from '../city/city.entity';
import { STATE_COLLECTION_NAME } from '../state/state.entity';
import { COUNTRY_COLLECTION_NAME } from '../country/country.entity';
import { ApplicationSourceEnums } from '../../../enums/applicationSource.enum';

export const JOB_APPLICATION_DOCUMENT_NAME = 'JobApplication';
export const JOB_APPLICATION_COLLECTION_NAME = 'jobApplications';

export default class JobApplication implements IJobApplication {
  _id :Schema.Types.ObjectId = new ObjectId('')
  applicantName: string = '';
  jobId: Schema.Types.ObjectId = new ObjectId('') ;
  email: string = '';
  phoneNumber: string = '';
  location: LocationDTO = new LocationDTO();
  coverLetter: string = '';
  resume: string = '';
  applicationSource: string = '';
  businessId : Schema.Types.ObjectId | Business | null = new ObjectId('');
  createdBy : Schema.Types.ObjectId | User | null = new ObjectId('');
  createdAt : Date; 
  updateddAt : Date; 
}

export interface IJobApplication {
  _id :Schema.Types.ObjectId 
  applicantName: string,
  jobId : Schema.Types.ObjectId,
  email: string,
  phoneNumber: string,
  location : ILocation,
  coverLetter: string,
  resume: string,
  applicationSource: string,
  businessId : Schema.Types.ObjectId | Business | null;
  createdBy : Schema.Types.ObjectId | User | null;
  createdAt : Date
  updateddAt : Date; 
}

const schema = new Schema<IJobApplication> (
  {
    businessId: { type: Schema.Types.ObjectId, ref: BUSINESS_COLLECTION_NAME, required: true},
    createdBy: { type: Schema.Types.ObjectId, ref: USER_COLLECTION_NAME , required: true},
    applicantName : { type: Schema.Types.String, required: true },
    jobId : { type: Schema.Types.ObjectId, ref: JOB_COLLECTION_NAME , required: true },
    phoneNumber : { type: Schema.Types.String, required: true, maxlength : 18 },
    coverLetter : { type: Schema.Types.String, required: true , maxlength : 5000 },
    resume : { type: Schema.Types.String, required: true , maxlength : 5000 },
    applicationSource : { type: Schema.Types.String, enum : {
      values : [ApplicationSourceEnums.CULTUREFY , ApplicationSourceEnums.INDEED, ApplicationSourceEnums.LINKEDIN , ApplicationSourceEnums.ZIPRECRUITER]
    }  , required: true , maxlength : 5000 },

    location: { 

      type : { type: Schema.Types.String, enum: {
        values : [
          GeoJSONObjectTypes.geometryCollection,
          GeoJSONObjectTypes.lineString, 
          GeoJSONObjectTypes.multiLineString, 
          GeoJSONObjectTypes.multiPoint, 
          GeoJSONObjectTypes.multiPolygon, 
          GeoJSONObjectTypes.point, 
          GeoJSONObjectTypes.polygon
        ]
      }},
      coordinates:[ 
        {type: Schema.Types.Number, min : -180 , max : 180 },
        {type: Schema.Types.Number, min : -90 , max : 90 }  ],
      formattedAddress:{ type: Schema.Types.String , maxlength : 5000  },
      street: { type: Schema.Types.String , maxlength : 5000 },
      zipcode: { type: Schema.Types.Number,  min : 0 , max : 99999 , },
      cityId:  { type: Schema.Types.ObjectId, ref :  CITY_COLLECTION_NAME },
      stateId:  { type: Schema.Types.ObjectId, ref :  STATE_COLLECTION_NAME },
      countryId:  { type: Schema.Types.ObjectId, ref :  COUNTRY_COLLECTION_NAME },

     },
    
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export const JobApplicationModel = model<JobApplication>(JOB_APPLICATION_DOCUMENT_NAME, schema, JOB_APPLICATION_COLLECTION_NAME)
