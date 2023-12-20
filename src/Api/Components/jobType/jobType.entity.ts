import mongoose, { model, Schema, Document } from 'mongoose';
import { USER_COLLECTION_NAME, User } from "../../../database/model/User"
import { ObjectId } from '../../../../constants';

export const DOCUMENT_NAME = 'JobType';
export const COLLECTION_NAME = 'jobTypes';

export default class JobType implements IJobType {
  _id :Schema.Types.ObjectId = new ObjectId('')
  userId : Schema.Types.ObjectId | User | null = new ObjectId('');
  name : string = "";

}

export interface IJobType {
  _id :Schema.Types.ObjectId 
  name : string;
  userId : Schema.Types.ObjectId | User | null;
}

const schema = new Schema<IJobType> (
  {
    userId: { type: Schema.Types.ObjectId, ref: USER_COLLECTION_NAME , required: true},
    name: { type: Schema.Types.String, required: true },
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export const JobTypeModel = model<IJobType>(DOCUMENT_NAME, schema, COLLECTION_NAME)
