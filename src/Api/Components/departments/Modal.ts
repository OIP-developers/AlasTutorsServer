import { model, Schema, Document } from 'mongoose';

export const DOCUMENT_NAME = 'businessDepartments';
export const COLLECTION_NAME = 'businessDepartments';

export interface IModal {
  title: string;
  isChecked?: boolean;
  isDeleted?: boolean;
}

export default interface DocumentModal extends Document, IModal { }

const schema = new Schema({
  title: {
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
