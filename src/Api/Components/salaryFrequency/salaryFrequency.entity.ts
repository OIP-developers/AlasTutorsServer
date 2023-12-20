import mongoose, { model, Schema, Document } from 'mongoose';
import { USER_COLLECTION_NAME, User } from "../../../database/model/User"
import { ObjectId } from '../../../../constants';

export const DOCUMENT_NAME = 'SalaryFrequency';
export const COLLECTION_NAME = 'salaryFrequencies';

export default class SalaryFrequency implements ISalaryFrequency {
  _id :Schema.Types.ObjectId = new ObjectId('')
  userId : Schema.Types.ObjectId | User | null = new ObjectId('');
  name : string = "";

}

export interface ISalaryFrequency {
  _id :Schema.Types.ObjectId 
  name : string;
  userId : Schema.Types.ObjectId | User | null;
}

const schema = new Schema<ISalaryFrequency> (
  {
    userId: { type: Schema.Types.ObjectId, ref: USER_COLLECTION_NAME , required: true},
    name: { type: Schema.Types.String, required: true },
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export const SalaryFrequencyModel = model<ISalaryFrequency>(DOCUMENT_NAME, schema, COLLECTION_NAME)
