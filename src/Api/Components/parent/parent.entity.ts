import { model, Schema, Document } from 'mongoose';
import User, { DOCUMENT_NAME as USER_DOCUMENT_NAME } from '../../../database/model/User';

export const DOCUMENT_NAME = 'Parent';
export const COLLECTION_NAME = 'parent';

export interface IParent {
  userId: Schema.Types.ObjectId | User
  data: any
}

export default interface Parent extends Document, IParent { }

const schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: USER_DOCUMENT_NAME,
      required: true
    },
    data: Schema.Types.Mixed
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export const ParentModel = model<Parent>(DOCUMENT_NAME, schema, COLLECTION_NAME)
