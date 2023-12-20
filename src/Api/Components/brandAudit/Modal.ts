import { model, Schema, Document } from 'mongoose';
import { text } from 'stream/consumers';

export const DOCUMENT_NAME = 'BrandAudit';
export const COLLECTION_NAME = 'BrandAudits';

export interface ISubSchema2 {
  value: string;
  name: string;
  isChecked: boolean;
}

export interface ISubSchema {
  subHeading: string;
  subOptions: ISubSchema2;
}

export interface IModal {
  heading: string;
  options: ISubSchema;
  isDeleted?: boolean
}

export default interface DocumentModal extends Document, IModal, ISubSchema, ISubSchema2 { }

const schema = new Schema({
  heading: {
    type: String,
    required: true,
  },
  options: [
    {
      subHeading: { type: String, required: true },
      subOptions: [
        {
          value: { type: String, required: true },
          name: { type: String, required: true },
          isChecked: { type: Schema.Types.Boolean, required: true, default: false }
        }
      ]
    }
  ],

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
