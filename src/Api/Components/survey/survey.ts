import { model, Schema, Document } from 'mongoose';
import { BUSINESS_COLLECTION_NAME } from "../../Components/business/business"
import { USER_COLLECTION_NAME } from "../../../database/model/User"

export const DOCUMENT_NAME = 'Survey';
export const COLLECTION_NAME = 'survey';

export default interface Survey extends Document, ISurvey { }

export interface ISurvey {
  survey: string;
  business: string;
  assigned: string[];
  name: string;
  description: string;
  completetion: string;
}

const schema = new Schema(
  {
    survey: {
      type: Schema.Types.String,
      required: true,
    },
    business: {
      type: Schema.Types.ObjectId,
      ref: BUSINESS_COLLECTION_NAME,
    },
    name: {
      type: Schema.Types.String,
    },
    description: {
      type: Schema.Types.String,
    },
    completion: {
      type: Schema.Types.Number,
      default: 0
    },
    assigned: [{ type: Schema.Types.ObjectId, ref: USER_COLLECTION_NAME }]
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export const surveyModel = model<Survey>(DOCUMENT_NAME, schema, COLLECTION_NAME)
