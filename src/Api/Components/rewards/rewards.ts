import { Document, Schema, model } from "mongoose";
export const DOCUMENT_NAME = "reward"
export const COLLECTION_NAME = "rewards"

export default interface reward extends Document { }

const schema = new Schema(
  {
    userIdFrom: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    userIdTo: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    timestamp: {
      type: Schema.Types.String,
      required: true
    },
    code: { // gcClaimCode
      type: Schema.Types.String,
      required: true
    },
    points: { // amount of points
      type: Schema.Types.Number,
      required: true
    },
    cardNumber: {
      type: Schema.Types.Number,
      required: false,
    },
    gcCurrencyCode: {
      type: Schema.Types.String,
      required: true
    },
    gcExpirationDate: {
      type: Schema.Types.String,
      required: false,
    },
    gcId: {
      type: Schema.Types.String,
      required: true,
    },
    creationRequestId: {
      type: Schema.Types.String,
      required: true,
    },
    status: { // cardStatus 
      type: Schema.Types.String,
      required: true
    },
    message: {
      type: Schema.Types.String,
      required: false
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export const rewardModel = model<reward>(DOCUMENT_NAME, schema, COLLECTION_NAME)