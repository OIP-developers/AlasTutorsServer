import { model, Schema, Document } from 'mongoose';
import User from '../../../database/model/User';

export const DOCUMENT_NAME = 'Student';
export const COLLECTION_NAME = 'student';

export interface IStudent {
  userId: Schema.Types.ObjectId | User
  parentId: Schema.Types.ObjectId | null
  data: any
}

export default interface Student extends Document, IStudent { }

const schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Parent",
      required: false
    },
    data: Schema.Types.Mixed
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export const StudentModel = model<Student>(DOCUMENT_NAME, schema, COLLECTION_NAME)
