import { model, Schema, Document } from 'mongoose';

export const DOCUMENT_NAME = 'BusinessesAnswers';
export const COLLECTION_NAME = 'businessesAnswers';

export default interface BusinessQuestions extends Document, IBusinessQuestions { }

export const enum BusinessStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE'
}

export interface IBusinessQuestions {
  answers: any;
  business: string;
}

const schema = new Schema(
  {
    answers: {
      type: Schema.Types.Mixed,
      required: true,
    },
    business: {
      type: Schema.Types.ObjectId,
      required: true
    }
  }
)

export const BusinessModal = model<BusinessQuestions>(DOCUMENT_NAME, schema, COLLECTION_NAME)