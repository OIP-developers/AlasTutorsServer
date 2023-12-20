import { model, Schema, Document } from 'mongoose';
import { DOCUMENT_NAME as QUESTIONS_DOCUMENT_NAME } from '../StrategyQuestions/Question';
import { USER_DOCUMENT_NAME } from '../../../database/model/User';

export const DOCUMENT_NAME = 'BCSanswer';
export const COLLECTION_NAME = 'BCSanswers';

export interface IModal {
  answer: any;
  question: string;
  user: string;
  isDeleted?: boolean;
}

export default interface DocumentModal extends Document, IModal { }

const schema = new Schema({
  answer: {
    type: Schema.Types.Mixed,
    required: true,
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: QUESTIONS_DOCUMENT_NAME,
    unique: false,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: USER_DOCUMENT_NAME,
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
