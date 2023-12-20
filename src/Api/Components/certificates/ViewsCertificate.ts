import { model, Schema, Document } from 'mongoose';
import { USER_COLLECTION_NAME } from "../../../database/model/User"
import { COLLECTION_NAME as COURSE_VIDEO_COLLECTION_NAME } from "../courseVideos/Modal"
import { COLLECTION_NAME as COURSE_COLLECTION_NAME } from "../module/Course"

export const DOCUMENT_NAME = 'ViewsCertificate';
export const COLLECTION_NAME = 'ViewsCertificates';

export interface IViewsCertificate {
  courseVideo?: string;
  course: string;
  user: string;
  isDeleted?: boolean;
}

export default interface DocumentModal extends Document, IViewsCertificate { }
const schema = new Schema({
  courseVideo: {
    type: Schema.Types.ObjectId,
    ref: COURSE_VIDEO_COLLECTION_NAME,
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: COURSE_COLLECTION_NAME,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: USER_COLLECTION_NAME,
    required: true,
  },
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

export const viewsCertificateModel = model<DocumentModal>(DOCUMENT_NAME, schema, COLLECTION_NAME)

