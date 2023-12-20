import { model, Schema, Document } from 'mongoose';
import { USER_DOCUMENT_NAME } from "./User"
import { DOCUMENT_NAME as CATEGORY_DOCUMENT_NAME } from "./Category"

export const DOCUMENT_NAME = 'Bucket';
export const COLLECTION_NAME = 'buckets';

export default interface Bucket extends Document {
  key: string,
  value: any,
  createdBy: Schema.Types.ObjectId,
  isDeleted: boolean
}

const schema = new Schema(
  {
    key: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      unique: true,
      minLength: 4,
      maxlength: 100,
    },
    type: {
      type: Schema.Types.String,
      required: true,
      enum: ['Blog', 'News']
    },
    thumbnail: {
      type: Schema.Types.String,
      required: true,
    },
    authorName: {
      type: Schema.Types.String,
      required: true,
    },
    authorImage: {
      type: Schema.Types.String,
      required: true,
    },
    readTime: {
      type: Schema.Types.String,
      required: true,
    },
    category: {
      type: [Schema.Types.ObjectId],
      ref: CATEGORY_DOCUMENT_NAME,
      required: true,
    },
    value: {
      type: Schema.Types.Mixed,
      required: true
    },
    isPublic: {
      type: Schema.Types.Boolean,
      required: false,
      default: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: USER_DOCUMENT_NAME,
      // required: true,
    },
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

export const BucketModel = model<Bucket>(DOCUMENT_NAME, schema, COLLECTION_NAME)
