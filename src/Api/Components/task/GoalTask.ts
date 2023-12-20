import { model, Schema, Document } from 'mongoose';
import { DOCUMENT_NAME as POSITION_GOALS_DOCUMENT_NAME } from '../PostionGoal/Modal';
import { DOCUMENT_NAME as DEPARTMENTS_DOCUMENT_NAME } from '../departments/Modal';

export const DOCUMENT_NAME = 'GoalTask';
export const COLLECTION_NAME = 'goalTask';

export default interface GoalTask extends Document, IGoalTask { }

export interface IGoalTask {
  title: string 
  goal: string 
  department: string
  dueDate: string
  description: string
  percentage: number
  business: string
  keyResults?: string[]
}

const schema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
    },
    goal: {
      type: Schema.Types.ObjectId,
      ref: POSITION_GOALS_DOCUMENT_NAME,
      required: true,
    },
    department: {
      type: Schema.Types.Array,
      ref: DEPARTMENTS_DOCUMENT_NAME,
      required: false,
    },
    dueDate: {
      type: Schema.Types.String,
      required: false,
    },
    description: {
      type: Schema.Types.String,
      required: false,
    },
    percentage: {
      type: Schema.Types.Number,
      default: 0,
      required: false
    },
    keyResults: {
      type: Schema.Types.Array,
      default: [],
      required: false
    },
    business: {
      type: Schema.Types.String,
      required: true
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

export const GoalTaskModel = model<GoalTask>(DOCUMENT_NAME, schema, COLLECTION_NAME)
