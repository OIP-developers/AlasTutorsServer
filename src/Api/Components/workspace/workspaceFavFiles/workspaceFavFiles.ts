import { model, Schema, Document } from 'mongoose';
import { USER_DOCUMENT_NAME } from '../../../../database/model/User';
import { DOCUMENT_NAME as WORKSPACE_FOLDER_DOCUMENT_NAME } from '../workspaceFolders/workspaceFolder';
import { DOCUMENT_NAME as WORKSPACE_FILE_DOCUMENT_NAME } from '../workspaceFiles/workspaceFile';

export const DOCUMENT_NAME = 'WorkspacesFavFiles';
export const COLLECTION_NAME = 'workspacesFavFiles';

export interface IWorkspaceFavFilesModal {
  folder: string;
  file: string;
  user: string;
  isDeleted?: boolean;
}

export default interface DocumentModal extends Document, IWorkspaceFavFilesModal { }

const schema = new Schema({
  folder: {
    type: Schema.Types.ObjectId,
    ref: WORKSPACE_FOLDER_DOCUMENT_NAME,
    required: true,
  },
  file: {
    type: Schema.Types.ObjectId,
    ref: WORKSPACE_FILE_DOCUMENT_NAME,
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

export const WorkspaceFavFilesModal = model<DocumentModal>(DOCUMENT_NAME, schema, COLLECTION_NAME)

