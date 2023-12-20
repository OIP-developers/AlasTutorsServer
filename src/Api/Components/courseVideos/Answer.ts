import { model, Schema, Document } from 'mongoose';
import { DOCUMENT_NAME as COURSE_VIDEO_DOCUMENT_NAME } from './Modal';
import { DOCUMENT_NAME as QUESTION_DOCUMENT_NAME } from './Question';
import { USER_DOCUMENT_NAME } from '../../../database/model/User';

export const DOCUMENT_NAME = 'Answers';
export const COLLECTION_NAME = 'Answers';

export interface IAnswersModal {
  user: string;
  video: string;
  question: string;
  answer: string;
}

export default interface DocumentModal extends Document, IAnswersModal { }

const schema = new Schema({

  user: {
    type: Schema.Types.ObjectId,
    ref: USER_DOCUMENT_NAME,
    required: true,
  },

  video: {
    type: Schema.Types.ObjectId,
    ref: COURSE_VIDEO_DOCUMENT_NAME,
    required: true,
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: QUESTION_DOCUMENT_NAME,
    required: true,
  },
  answer: {
    type: Schema.Types.String,
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

export const AnswersModal = model<DocumentModal>(DOCUMENT_NAME, schema, COLLECTION_NAME)