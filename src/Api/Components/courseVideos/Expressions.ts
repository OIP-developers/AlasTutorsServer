import { model, Schema, Document } from 'mongoose';
import { DOCUMENT_NAME as COURSE_VIDEO_DOCUMENT_NAME } from './Modal';
import { USER_DOCUMENT_NAME } from '../../../database/model/User';

export const DOCUMENT_NAME = 'Expressions';
export const COLLECTION_NAME = 'Expressions';

export enum Expression {
  LIKE = "LIKE",
  DISLIKE = "DISLIKE",
  CAMPAIGNS = "CAMPAIGNS",
}

export interface IExpressionModal {
  user: string;
  video: string;
  expression?: string;
}

export default interface DocumentModal extends Document, IExpressionModal { }

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

  expression: {
    type: Schema.Types.String,
    enum: [Expression.LIKE, Expression.DISLIKE],
    required: false,
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

export const ExpressionModal = model<DocumentModal>(DOCUMENT_NAME, schema, COLLECTION_NAME)