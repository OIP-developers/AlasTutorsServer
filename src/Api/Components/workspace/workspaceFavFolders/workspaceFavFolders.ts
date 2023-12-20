import { model, Schema, Document } from 'mongoose';
import { USER_DOCUMENT_NAME } from '../../../../database/model/User';
import { DOCUMENT_NAME as WORKSPACE_FOLDER_DOCUMENT_NAME } from '../workspaceFolders/workspaceFolder';

export const DOCUMENT_NAME = 'WorkspacesFavFolders';
export const COLLECTION_NAME = 'workspacesFavFolders';

export interface IWorkspaceFavFoldersModal {
  folder: string;
  user: string;
  isDeleted?: boolean;
}

export default interface DocumentModal extends Document, IWorkspaceFavFoldersModal { }

const schema = new Schema({
  folder: {
    type: Schema.Types.ObjectId,
    ref: WORKSPACE_FOLDER_DOCUMENT_NAME,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: USER_DOCUMENT_NAME,
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

export const WorkspaceFavFoldersModal = model<DocumentModal>(DOCUMENT_NAME, schema, COLLECTION_NAME)

