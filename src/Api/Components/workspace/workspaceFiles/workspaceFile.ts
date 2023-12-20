import { model, Schema, Document } from 'mongoose';
import { DOCUMENT_NAME as WORKSPACE_DOCUMENT_NAME } from '../Modal';
import { DOCUMENT_NAME as WORKSPACE_FOLDER_DOCUMENT_NAME } from '../workspaceFolders/workspaceFolder';

export const DOCUMENT_NAME = 'WorkspacesFiles';
export const COLLECTION_NAME = 'workspacesFiles';

export interface IWorkspaceFileModal {
  name: string;
  url: string;
  size: string;
  type: string;
  folder?: string;
  workspace: string;
  isDeleted?: boolean;
}

export default interface WorkspaceFileDocument extends Document, IWorkspaceFileModal { }

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  folder: {
    type: Schema.Types.ObjectId,
    ref: WORKSPACE_FOLDER_DOCUMENT_NAME,
    required: false,
  },
  workspace: {
    type: Schema.Types.ObjectId,
    ref: WORKSPACE_DOCUMENT_NAME,
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

export const WorkspaceFileModal = model<WorkspaceFileDocument>(DOCUMENT_NAME, schema, COLLECTION_NAME)
