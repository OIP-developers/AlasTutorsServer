import { model, Schema, Document } from 'mongoose';
import User from '../../../database/model/User';

export const DOCUMENT_NAME = 'Invoice';
export const COLLECTION_NAME = 'invoice';

export interface IInvoice {
  userId: Schema.Types.ObjectId | User
  data: any
}

export default interface Invoice extends Document, IInvoice { }

const schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    data: Schema.Types.Mixed
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export const InvoiceModel = model<Invoice>(DOCUMENT_NAME, schema, COLLECTION_NAME)
