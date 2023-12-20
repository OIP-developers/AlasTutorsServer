import { model, Schema, Document } from 'mongoose';
import { text } from 'stream/consumers';
import { RecommendationFunction } from '../recommendation/Recommendation';

export const DOCUMENT_NAME = 'PossesCard';
export const COLLECTION_NAME = 'PossesCards';

export interface IModal {
  title: string;
  description: string;
  image: string;
  points: [];
  color: string;
  function: string;
  text_color: string;
  isChecked: boolean;
}

export default interface DocumentModal extends Document, IModal { }

const schema = new Schema({
  title: {
    type: Schema.Types.String,
    required: true,
  },
  description: {
    type: Schema.Types.String,
    required: true,
  },
  image: {
    type: Schema.Types.String,
    required: true,
  },
  points: {
    type: Schema.Types.Array,
    required: true,
  },
  color: {
    type: Schema.Types.String,
    required: true,
    // enum: [RecommendationFunction]
  },
  function: {
    type: Schema.Types.String,
    required: false,
    enum: [RecommendationFunction.CAMPAIGNS, RecommendationFunction.LEARNING, RecommendationFunction.CULTURE_CHECK, RecommendationFunction.REWARDS, RecommendationFunction.COMMUNITY]
  },
  text_color: {
    type: Schema.Types.String,
    required: true,
    default: "#fff"
  },
  isChecked: { type: Schema.Types.Boolean, default: false },

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

export const Modal = model<DocumentModal>(DOCUMENT_NAME, schema, COLLECTION_NAME)
