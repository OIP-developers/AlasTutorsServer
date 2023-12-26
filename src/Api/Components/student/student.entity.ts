import { model, Schema, Document } from 'mongoose';
import User from '../../../database/model/User';

export const DOCUMENT_NAME = 'Student';
export const COLLECTION_NAME = 'student';

export interface IStudent {
  userId: Schema.Types.ObjectId | User
  data: any
}

export default interface Student extends Document, IStudent { }

const schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    data: Schema.Types.Mixed
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export const StudentModel = model<Student>(DOCUMENT_NAME, schema, COLLECTION_NAME)
