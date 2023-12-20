import { model, Schema, Document } from 'mongoose';
import { COLLECTION_NAME as CERTIFICATE_DOCUMENT_NAME } from "./Modal"
import { COLLECTION_NAME as COURSE_DOCUMENT_NAME } from "../module/Course"

export const DOCUMENT_NAME = 'certificateQuiz';
export const COLLECTION_NAME = 'CertificateQuiz';

export default interface CertificateQuiz extends Document, ICertificateQuiz { }

export interface ICertificateQuiz {
  course: string;
  certificate: string;
  survey: string;
}

const schema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: COURSE_DOCUMENT_NAME,
      required: true,
    },
    certificate: {
      type: Schema.Types.ObjectId,
      ref: CERTIFICATE_DOCUMENT_NAME,
      required: true,
    },
    survey: {
      type: Schema.Types.String,
      required : true
    },
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export const certificateQuizModel = model<CertificateQuiz>(DOCUMENT_NAME, schema, COLLECTION_NAME)
