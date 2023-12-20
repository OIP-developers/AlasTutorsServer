import { model, Schema, Document } from 'mongoose';
import { COLLECTION_NAME as POSSES_COLLECTION_NAME } from '../PostionGoal/Modal';
import { COLLECTION_NAME as ROLE_COLLECTION_NAME, RoleCode } from '../../../database/model/Role';

export const DOCUMENT_NAME = 'Recommendation';
export const COLLECTION_NAME = 'recommendations';

export enum RecommendationFunction {
  LEARNING = "LEARNING",
  CULTURE_CHECK = "CULTURE_CHECK",
  REWARDS = "REWARDS",
  COMMUNITY = "COMMUNITY",
  CAMPAIGNS = "CAMPAIGNS",
}

export default interface Recommendation extends Document, IRecommendation { }

export interface IRecommendation {
  title: string,
  description: string,
  goals: string[],
  function: string,
  isDeleted: boolean,
}


const schema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      unique: false,
    },
    description: {
      type: Schema.Types.String,
      required: true,
    },
    goals: {
      type: Schema.Types.Array,
      ref: POSSES_COLLECTION_NAME,
      required: true
    },
    role: {
      type: Schema.Types.String,
      ref: ROLE_COLLECTION_NAME,
      enum: [RoleCode.USER, RoleCode.ADMIN],
      default: RoleCode.ADMIN,
      required: true
    },
    function: {
      type: Schema.Types.String,
      required: true,
      enum: [RecommendationFunction.CAMPAIGNS, RecommendationFunction.LEARNING, RecommendationFunction.CULTURE_CHECK, RecommendationFunction.REWARDS, RecommendationFunction.COMMUNITY]
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

export const RecommendationModel = model<Recommendation>(DOCUMENT_NAME, schema, COLLECTION_NAME)
