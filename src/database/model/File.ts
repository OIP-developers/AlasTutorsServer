import { model, Schema, Document } from 'mongoose';
import { DOCUMENT_NAME as USER_DOCUMENT_NAME } from "./User"

export const DOCUMENT_NAME = 'File';
export const COLLECTION_NAME = 'file';

export default interface File extends Document {
  path: string,
  fileName: string,
  fileSize: string,
  fileType: string,
  createdBy: Schema.Types.ObjectId,
  isDeleted: boolean
}

const schema = new Schema(
  {
    path: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    fileName: {
      type: Schema.Types.String,
      required: true
    },
    fileSize: {
      type: Schema.Types.String,
      required: true
    },
    fileType: {
      type: Schema.Types.String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: USER_DOCUMENT_NAME,
      // required: true,
    },
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

export const FileModel = model<File>(DOCUMENT_NAME, schema, COLLECTION_NAME)
