import { model, Schema, Document } from 'mongoose';
import { DOCUMENT_NAME as WORKSPACE_DOCUMENT_NAME } from '../workspace/Modal';
import { USER_DOCUMENT_NAME } from '../../../database/model/User';

export const DOCUMENT_NAME = 'WorkspacesUsers';
export const COLLECTION_NAME = 'workspacesUsers';

export interface IModal {
  workspace: string;
  user: string;
  role: string;
  isDeleted?: boolean;
}

export enum WORKSPACE_ROLE {
  LISTENER = "LISTENER",
  HOST = "HOST",
  SPEAKER = "SPEAKER"
}

export default interface DocumentModal extends Document, IModal { }

const schema = new Schema({
  workspace: {
    type: Schema.Types.ObjectId,
    ref: WORKSPACE_DOCUMENT_NAME,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: USER_DOCUMENT_NAME,
    required: true,
  },
  role: {
    type: String,
    enum: [WORKSPACE_ROLE.HOST, WORKSPACE_ROLE.LISTENER, WORKSPACE_ROLE.SPEAKER],
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

