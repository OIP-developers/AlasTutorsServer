import { model, Schema, Document } from 'mongoose';
import { DOCUMENT_NAME as WORKSPACE_DOCUMENT_NAME } from '../workspace/Modal';

export const DOCUMENT_NAME = 'WorkspacesAgenda';
export const COLLECTION_NAME = 'workspacesAgenda';

export interface IModal {
  workspace: string;
  agenda: [{
    agenda: string;
  }];
}

export default interface DocumentModal extends Document, IModal { }

const schema = new Schema({
  workspace: {
    type: Schema.Types.ObjectId,
    ref: WORKSPACE_DOCUMENT_NAME,
    required: true,
  },
  agenda: [{
    agenda: {
      type: Schema.Types.String,
      required: false,
      default: null
    },
  }],

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

