import { Schema, model, Document } from 'mongoose';

export const DOCUMENT_NAME = 'Invoice';
export const COLLECTION_NAME = 'invoices';

export const enum InvoiceType {
  REGISTRATION_DISCOUNT = 'REGISTRATION_DISCOUNT',
}

export default interface Invoice extends Document {
  amount: string;
  status: boolean;
  type: InvoiceType;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema(
  {
    amount: {
      type: Schema.Types.String,
      required: true,
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
    type: {
      type: Schema.Types.Boolean,
      default: InvoiceType.REGISTRATION_DISCOUNT,
      enum: [InvoiceType.REGISTRATION_DISCOUNT],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      required: true,
      select: false,
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

export const InvoiceModel = model<Invoice>(DOCUMENT_NAME, schema, COLLECTION_NAME);
