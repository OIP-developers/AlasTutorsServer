import { model, Schema, Document } from 'mongoose';
import { DOCUMENT_NAME as GOAL_DOCUMENT_NAME } from "./GoalTask"
import { BUSINESS_DOCUMENT_NAME } from "../business/business"

export const DOCUMENT_NAME = 'Task';
export const COLLECTION_NAME = 'tasks';

export default interface Task extends Document, ITask { }

export interface ITask {
  title: string,
  description: string,
  dueDate: string,
  isDeleted: boolean,
  goalTask: string,
  user: string[] | string,
}

const schema = new Schema(
  {
    title: {
      type: Schema.Types.String,
    },
    goalTask: {
      type: Schema.Types.String,
      ref: GOAL_DOCUMENT_NAME
    },
    business: {
      type: Schema.Types.String,
      ref: BUSINESS_DOCUMENT_NAME
    },
    description: {
      type: Schema.Types.String,
      required: false,
    },
    progress: {
      type: Schema.Types.Number,
      default: 0,
    },
    dueDate: {
      type: Schema.Types.String,
      required: false,
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

export const TaskModel = model<Task>(DOCUMENT_NAME, schema, COLLECTION_NAME)
