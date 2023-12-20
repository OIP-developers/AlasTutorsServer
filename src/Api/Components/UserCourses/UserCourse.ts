import { model, Schema, Document } from 'mongoose';
import { USER_COLLECTION_NAME } from '../../../database/model/User';
import { COLLECTION_NAME as COURSE_COLLECTION_NAME } from '../module/Course';

export const DOCUMENT_NAME = 'UserCourse';
export const COLLECTION_NAME = 'userCourses';

export enum UserCourseStatus {
  PENDING = "PENDING",
  COMPLETE = "COMPLETE",
  CANCEL = "CANCEL",
  EXPIRE = "EXPIRE"
}

export default interface UserCourse extends Document, IUserCourse { }

export interface IUserCourse {
  user: string,
  course: string,
  startAt: Date,
  endAt: Date,
  status: UserCourseStatus,
  percentage: number,
  isDeleted: boolean,
}


const schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: USER_COLLECTION_NAME,
      required: true
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: COURSE_COLLECTION_NAME,
      required: true
    },
    startAt: {
      type: Schema.Types.Date,
      default: new Date(),
      required: false
    },
    endAt: {
      type: Schema.Types.Date,
      required: false
    },
    status: {
      type: Schema.Types.String,
      enum: [UserCourseStatus.PENDING, UserCourseStatus.COMPLETE, UserCourseStatus.CANCEL, UserCourseStatus.EXPIRE],
      default: UserCourseStatus.PENDING,
      required: false
    },
    percentage: {
      type: Schema.Types.Number,
      default: 0,
      required: false
    },

    isDeleted: {
      type: Schema.Types.Boolean,
      default: false
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export const UserCourseModel = model<UserCourse>(DOCUMENT_NAME, schema, COLLECTION_NAME)
