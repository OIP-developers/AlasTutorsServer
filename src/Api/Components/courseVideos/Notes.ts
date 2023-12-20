import { model, Schema, Document } from 'mongoose';
import { DOCUMENT_NAME as COURSE_VIDEO_DOCUMENT_NAME } from './Modal';
import { USER_DOCUMENT_NAME } from '../../../database/model/User';

export const DOCUMENT_NAME = 'Notes';
export const COLLECTION_NAME = 'Notes';

export interface INotesModal {
  user: string;
  video: string;
  note: string;
}

export default interface DocumentModal extends Document, INotesModal { }

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
  note: {
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

export const NotesModal = model<DocumentModal>(DOCUMENT_NAME, schema, COLLECTION_NAME)