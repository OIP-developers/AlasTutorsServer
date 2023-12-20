import { model, Schema, Document } from 'mongoose';
import { text } from 'stream/consumers';

export const DOCUMENT_NAME = 'Cultur';
export const COLLECTION_NAME = 'Culturs';

export interface IModal {
  title: string;
  isDeleted?: boolean
}

export default interface DocumentModal extends Document, IModal { }

const schema = new Schema({
  title: {
    type: String,
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
