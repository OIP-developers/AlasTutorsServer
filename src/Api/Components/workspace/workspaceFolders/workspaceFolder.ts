import { model, Schema, Document } from 'mongoose';
import { DOCUMENT_NAME as WORKSPACE_DOCUMENT_NAME } from '../Modal';

export const DOCUMENT_NAME = 'WorkspacesFolders';
export const COLLECTION_NAME = 'WorkspacesFolders';

export interface IWorkspaceFolderModal {
  name: string;
  workspace: string;
  isDeleted?: boolean;
}

export default interface WorkspaceFolderDocument extends Document, IWorkspaceFolderModal { }

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  workspace: {
    type: Schema.Types.ObjectId,
    ref: WORKSPACE_DOCUMENT_NAME,
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

export const WorkspaceFolderModal = model<WorkspaceFolderDocument>(DOCUMENT_NAME, schema, COLLECTION_NAME)

