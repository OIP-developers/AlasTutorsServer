import { Schema, model, Document } from 'mongoose';

export const DOCUMENT_NAME = 'Invoice';
export const COLLECTION_NAME = 'invoices';

export const enum InvoiceType {
  STUDENT_REGISTRATION = 'STUDENT_REGISTRATION',
}
export default interface Invoice extends Document {
  amount: string;
  status: boolean;
  type: InvoiceType;
  createdAt: Date;
  updatedAt: Date;
}
const schema = new Schema({
  amount: { type: Schema.Types.String, required: true, },
  status: { type: Schema.Types.Boolean, default: true, },
  type: { type: Schema.Types.Boolean, default: InvoiceType.STUDENT_REGISTRATION, enum: [InvoiceType.STUDENT_REGISTRATION], },
},
  { versionKey: false, timestamps: true },
);

export const InvoiceModel = model<Invoice>(DOCUMENT_NAME, schema, COLLECTION_NAME);