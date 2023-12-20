import { model, Schema, Document } from 'mongoose';
import { BUSINESS_COLLECTION_NAME } from "../business/business"
import { USER_COLLECTION_NAME } from "../../../database/model/User"

export const DOCUMENT_NAME = 'course';
export const COLLECTION_NAME = 'courses';

export interface ICourse {
  title: string,
  number_of_lessons: number,
  duration: string,
  instructor: string,
  details: string,
  business: string,
  // thumbnail: string,
  // attachment: []
  isDeleted: boolean,
  status: string,
}

export default interface Course extends Document, ICourse { }

const schema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
      unique: true
    },
    number_of_lessons: {
      type: Schema.Types.Number,
      required: true,
    },
    duration: {
      type: Schema.Types.String,
      required: true,
    },
    instructor: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: USER_COLLECTION_NAME
    },
    business: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: BUSINESS_COLLECTION_NAME
    },
    details: {
      type: Schema.Types.String,
      required: true,
    },
    thumbnail: {
      type: Schema.Types.String,
      required: true,
    },
    attachment: {
      type: Schema.Types.Array,
      required: false,
    },
    isPublish: {
      type: Schema.Types.Boolean,
      required: true,
    },
    status: {
      type: Schema.Types.String,
      enum: ['PUBLIC', 'PRIVATE'],
      default: 'PRIVATE',
      required: false,
    },

    // **meta
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

export const CourseModel = model<Course>(DOCUMENT_NAME, schema, COLLECTION_NAME)
