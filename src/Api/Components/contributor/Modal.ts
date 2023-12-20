import { model, Schema, Document } from 'mongoose';
import { DOCUMENT_NAME as FILE_DOCUMENT_NAME } from '../workspace/workspaceFiles/workspaceFile';
import { USER_DOCUMENT_NAME } from '../../../database/model/User';

export const DOCUMENT_NAME = 'Contributor';
export const COLLECTION_NAME = 'contributor';

export interface IModal {
  file: string;
  contributor: string;
  isDeleted?: boolean;
}

export default interface DocumentModal extends Document, IModal { }

const schema = new Schema({
  file: {
    type: String,
    required: true,
    ref: FILE_DOCUMENT_NAME
  },
  contributor: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: USER_DOCUMENT_NAME,
    default: null
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
