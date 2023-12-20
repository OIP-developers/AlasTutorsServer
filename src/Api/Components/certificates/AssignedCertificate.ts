import { model, Schema, Document, Types, PopulatedDoc } from 'mongoose';
import { USER_COLLECTION_NAME } from "../../../database/model/User"
import { DOCUMENT_NAME as COURSE_COLLECTION_NAME } from "../module/Course"
import { COLLECTION_NAME as CERTIFICATE_COLLECTION_NAME } from "./Modal"
import { COLLECTION_NAME as CERTIFICATE_ANSWER_COLLECTION_NAME } from "./certificateQuizAnswer"

export const DOCUMENT_NAME = 'AssignedCertificate';
export const COLLECTION_NAME = 'AssignedCertificates';

export default interface DocumentModal extends Document, IAssignedCertificate { }

export enum STATUS {
  PENDING = "PENDING",
  COMPLETE = "COMPLETE"
}

export interface IAssignedCertificate {
  certificate?: PopulatedDoc<Document<Schema.Types.ObjectId> & DocumentModal>;
  course: string;
  user: PopulatedDoc<Document<Schema.Types.ObjectId> & DocumentModal>;
  status?: string;
  startDate?: Date;
  endDate?: Date;
  progress?: Number;
  sent?: boolean;
  isDeleted?: boolean;
  certificateQuizAnswer?: PopulatedDoc<Document<Schema.Types.ObjectId> & DocumentModal>;
}


const schema = new Schema({
  certificate: {
    // @ts-ignore
    type: Schema.Types.ObjectId,
    ref: CERTIFICATE_COLLECTION_NAME,
    // @ts-ignore
    required: true,
  },
  course: {
    // @ts-ignore
    type: Schema.Types.ObjectId,
    ref: COURSE_COLLECTION_NAME,
    // @ts-ignore
    required: true,
  },
  user: {
    // @ts-ignore
    type: Schema.Types.ObjectId,
    ref: USER_COLLECTION_NAME,
    // @ts-ignore
    required: true,
  },
  // @ts-ignore
  status: {
    // @ts-ignore
    type: String,
    // @ts-ignore
    required: true,
    enum: [STATUS.PENDING, , STATUS.COMPLETE]
  },
  // @ts-ignore
  progress: {
    type: Number,
    required: false,
    default: 0
  },
  startDate: {
    // @ts-ignore
    type: Date,
    required: false,
    default: Date.now
  },
  // @ts-ignore
  endDate: {
    // @ts-ignore
    type: Date,
    required: false,
    default: null
  },
  // @ts-ignore
  sent: {
    type: Schema.Types.Boolean,
    required: false,
    default: false
  },
  // @ts-ignore
  certificateQuizAnswer: {
    // @ts-ignore
    type: Schema.Types.ObjectId,
    ref: USER_COLLECTION_NAME,
    required: false,
    default: null
  },

  // @meta
  // @ts-ignore
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

export const assignedCertificateModel = model<DocumentModal>(DOCUMENT_NAME, schema, COLLECTION_NAME)

