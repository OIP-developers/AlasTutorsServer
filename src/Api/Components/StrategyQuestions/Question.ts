import { model, Schema, Document } from 'mongoose';
import { text } from 'stream/consumers';
import { DOCUMENT_NAME as SUBCATEGORY_DOCUMENT_NAME } from '../SubCategory/subCategory';

export const DOCUMENT_NAME = 'SimpleQuestion';
export const COLLECTION_NAME = 'simpleQuestions';

export enum QUESTION_TYPE {
  BRAND_AUDIT = "BRAND_AUDIT",
  TEXT = "TEXT",
  POSITION_GOALS = "POSITION_GOALS",
  POSSES_CARDS = "POSSES_CARDS"
}

export interface ISimpleQuestion {
  question: string;
  type: string;
  subcategory: string;
}

export default interface Question extends Document, ISimpleQuestion { }

const schema = new Schema({
  question: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["TEXT", "POSITION_GOALS", "CAMPAIGNS", "ACTIVATIONS AND TACTICS", "WORK_GOALS", "WORK_SKILLS", "LIFE_EXPERIENCES", "CULTURE_GROUPS", "BRAND_AUDIT", "POSSES_CARDS"],
    default: 'TEXT',
    required: true,
  },
  subcategory: {
    type: Schema.Types.ObjectId,
    ref: SUBCATEGORY_DOCUMENT_NAME,
    required: true,
    unique: true,
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

export const SimpleQuestionModel = model<Question>(DOCUMENT_NAME, schema, COLLECTION_NAME)
