import { model, Schema, Document } from 'mongoose';
import User from '../../../database/model/User';

export const DOCUMENT_NAME = 'Teacher';
export const COLLECTION_NAME = 'teacher';

export interface ITeacher {
  userId: Schema.Types.ObjectId | User
  data: any
}

export default interface Teacher extends Document, ITeacher { }

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

export const TeacherModel = model<Teacher>(DOCUMENT_NAME, schema, COLLECTION_NAME)
