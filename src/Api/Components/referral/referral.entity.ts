import { model, Schema, Document } from 'mongoose';
import User from '../../../database/model/User';

export const DOCUMENT_NAME = 'Referral';
export const COLLECTION_NAME = 'referral';

export interface IReferral {
  isUsed: Boolean
  usedBy: Schema.Types.ObjectId
  userId: Schema.Types.ObjectId | User
  url: String

}

export default interface Referral extends Document, IReferral { }

const schema = new Schema(
  {
    isUsed: {
      type: Schema.Types.Boolean,
      required: true
    },
    usedBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: false
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    type: {
      type: Schema.Types.String,
      enum : ["PARENT" , "STUDENT"],
      required: true,
    },
    code: {
      type: Schema.Types.String,
      required: true,
      unique : true
    },

  },
  {
    versionKey: false,
    timestamps: true
  }
)

export const ReferralModel = model<Referral>(DOCUMENT_NAME, schema, COLLECTION_NAME)
