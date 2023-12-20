import { model, Schema, Document } from 'mongoose';
import { DOCUMENT_NAME as ASSIGNED_CERTIFICATE_DOCUMENT_NAME } from "./AssignedCertificate"
import { COLLECTION_NAME as CERTIFICATE_QUIZ_DOCUMENT_NAME } from "./certificateQuiz"
import { USER_COLLECTION_NAME } from "../../../database/model/User"

export const DOCUMENT_NAME = 'certificateQuizAnswer';
export const COLLECTION_NAME = 'CertificateQuizAnswer';

export default interface CertificateQuizAnswer extends Document, ICertificateQuizAnswer { }

export enum QUIZ_STATUS {
  PASS = "PASS",
  FAILED = "FAILED"
}

export interface ICertificateQuizAnswer {
  assignedCertificate: string;
  certificateQuiz: string;
  answer: string;
  status: string;
}

const schema = new Schema(
  {
    assignedCertificate: {
      type: Schema.Types.ObjectId,
      ref: "AssignedCertificate",
      required: true,
    },
    certificateQuiz: {
      type: Schema.Types.ObjectId,
      ref: CERTIFICATE_QUIZ_DOCUMENT_NAME,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: USER_COLLECTION_NAME,
      required: true,
    },
    answer: {
      type: Schema.Types.String,
      required: true
    },
    progress: {
      type: Schema.Types.Number,
      required: false
    },
    status: {
      type: Schema.Types.String,
      required: true,
      enum: [QUIZ_STATUS.FAILED, QUIZ_STATUS.PASS]
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export const certificateQuizAnswerModel = model<CertificateQuizAnswer>(DOCUMENT_NAME, schema, COLLECTION_NAME)
