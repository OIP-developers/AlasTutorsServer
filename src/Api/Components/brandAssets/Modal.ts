import { model, Schema, Document } from 'mongoose';
import { BUSINESS_COLLECTION_NAME } from "../../Components/business/business"

export const DOCUMENT_NAME = 'BrandAssets';
export const COLLECTION_NAME = 'brandAssets';

export interface IModal {
  business: string;
  colors: string[];
  logos: string[];
  fonts: string[];
}

export default interface DocumentModal extends Document, IModal { }

const schema = new Schema(
  {
    business: {
      type: Schema.Types.ObjectId,
      ref: BUSINESS_COLLECTION_NAME,
    },
    colors: [{ type: Schema.Types.String, required: true }],
    logos: [{ type: Schema.Types.String, required: true }],
    fonts: [{ type: Schema.Types.String, required: true }]
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export const Modal = model<DocumentModal>(DOCUMENT_NAME, schema, COLLECTION_NAME)

