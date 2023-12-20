import { model, Schema, Document } from 'mongoose';

export const DOCUMENT_NAME = 'BusinessesQuestions';
export const COLLECTION_NAME = 'businessesQuestions';

export default interface BusinessQuestions extends Document, IBusinessQuestions { }

export const enum BusinessStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE'
}

export interface IBusinessQuestions {
  question: string;
  business: string;
}

const schema = new Schema(
  {
    question: {
      type: Schema.Types.String,
      required: true,
    },
    business: {
      type: Schema.Types.ObjectId,
      required: true
    }
  }
)

export const BusinessModal = model<BusinessQuestions>(DOCUMENT_NAME, schema, COLLECTION_NAME)