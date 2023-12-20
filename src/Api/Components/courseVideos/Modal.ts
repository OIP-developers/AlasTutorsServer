import { model, Schema, Document } from 'mongoose';
import { DOCUMENT_NAME as COURSE_DOCUMENT_NAME } from '../module/Course';

export const DOCUMENT_NAME = 'CourseVideo';
export const COLLECTION_NAME = 'CourseVideos';

export interface IModal {
  videoTitle: string;
  courseId: string;
  source: string;
  index: number;
}

export default interface DocumentModal extends Document, IModal { }

const schema = new Schema({
  videoTitle: {
    type: Schema.Types.String,
    required: false,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: COURSE_DOCUMENT_NAME,
    required: true,
  },
  source: {
    type: Schema.Types.String,
    required: false,
  },
  index: {
    type: Schema.Types.Number,
    required: true,
  },

  // @meta
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

export const Modal = model<DocumentModal>(DOCUMENT_NAME, schema, COLLECTION_NAME)
