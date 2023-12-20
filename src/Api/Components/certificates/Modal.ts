import { model, Schema, Document } from 'mongoose';
import {DOCUMENT_NAME as COURSE_DOCUMENT_NAME} from '../module/Course'

export const DOCUMENT_NAME = 'Certificates';
export const COLLECTION_NAME = 'Certificates';

export interface IModal {
  title: string;
  course: string;
  require_test?: boolean;
  isDeleted?: boolean;
}

export default interface DocumentModal extends Document, IModal { }

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: COURSE_DOCUMENT_NAME,
    required: true,
  },
  require_test: {
    type: Schema.Types.Boolean,
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

