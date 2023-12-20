import { model, Schema, Document } from 'mongoose';

export const DOCUMENT_NAME = 'PostionGoal';
export const COLLECTION_NAME = 'PostionGoals';

export interface IModal {
  title: string;
  description: string;
  isChecked?: boolean;
  isDeleted?: boolean;
}

export default interface DocumentModal extends Document, IModal { }

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isChecked: {
    type: Schema.Types.Boolean,
    required: false,
    default: false
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

