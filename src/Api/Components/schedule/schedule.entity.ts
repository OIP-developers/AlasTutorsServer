import mongoose, { model, Schema, Document } from 'mongoose';
import Business, { BUSINESS_COLLECTION_NAME } from "../business/business"
import { USER_COLLECTION_NAME, User } from "../../../database/model/User"
import { ObjectId } from '../../../../constants';
import { ScheduleEnums } from '../../../enums/schedule.enum';
import RecruitmentInterview, { IRecruitmentInterview, RecruitmentInterviewModel  } from '../recruitmentInterview/recruitmentInterview.entity';
import { recruitmentInterviewDBDataVaidationSchema } from '../../../validations/payloadSchema/RecruitmentInterviewSchema';

export const SCHEDULE_DOCUMENT_NAME = 'Schedule';
export const SCHEDULE_COLLECTION_NAME = 'schedules';

export default class Schedule implements ISchedule {
  _id :Schema.Types.ObjectId = new ObjectId('')
  data: RecruitmentInterview | {} =  {};
  type : ScheduleEnums ;
  fromTime : Date = new Date();
  toTime : Date = new Date();
  associatedUsers : Schema.Types.ObjectId[] | User[] = []
  businessId : Schema.Types.ObjectId | Business | null = new ObjectId('');
  createdBy : Schema.Types.ObjectId | User | null = new ObjectId('');
  createdAt : Date;
  updateddAt : Date;  
}

export interface ISchedule {
  _id: Schema.Types.ObjectId 
  data : IRecruitmentInterview | {}
  type : ScheduleEnums;
  fromTime : Date;
  toTime : Date;
  associatedUsers : Schema.Types.ObjectId[] | User[]
  businessId : Schema.Types.ObjectId | Business | null;
  createdBy : Schema.Types.ObjectId | User | null;
  createdAt : Date
  updateddAt : Date;
}

// Define the main schema
const schema = new Schema<ISchedule>(
  {
    businessId: { type: Schema.Types.ObjectId, ref: BUSINESS_COLLECTION_NAME, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: USER_COLLECTION_NAME, required: true },
    associatedUsers: { type: [Schema.Types.ObjectId], ref: USER_COLLECTION_NAME },
    fromTime: { type: Schema.Types.Date, required: true },
    toTime: { type: Schema.Types.Date, required: true },
    data: { type: Schema.Types.Mixed, required: true } ,
    type: {
      type: Schema.Types.String,
      required: true,
      enum: { values: [ScheduleEnums.RecruitmentInterview] },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

schema.pre('save', async function (next) {
  switch (this.type) {
    case ScheduleEnums.RecruitmentInterview:
      const validation = await recruitmentInterviewDBDataVaidationSchema.validateAsync(this.data);
      if (validation.error) {
        return next(new Error(`Invalid data: ${validation.error.message}`));
      }
       const newData = await new RecruitmentInterviewModel(this.data)
       this.data = newData
      return next();

    default:
      return next(new Error(`Invalid schedule data type: ${this.type}`));
  }
});

export const ScheduleModel = model<ISchedule>(SCHEDULE_DOCUMENT_NAME, schema, SCHEDULE_COLLECTION_NAME)
