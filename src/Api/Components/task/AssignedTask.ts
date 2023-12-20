import { model, Schema, Document } from 'mongoose';
import { DOCUMENT_NAME as TASK_DOCUMENT_NAME } from './Task';
import { USER_DOCUMENT_NAME } from "../../../database/model/User"

export const DOCUMENT_NAME = 'AssignTask';
export const COLLECTION_NAME = 'assigntasks';

export enum TaskStatus {
  PENDING = "PENDING",
  COMPLETE = "COMPLETE",
  CANCEL = "CANCEL",
  EXPIRE = "EXPIRE"
}

export default interface AssignTask extends Document, IAssignTask { }

export interface IAssignTask {
  task: string,
  user: string,
  isDeleted: boolean,
}

const schema = new Schema(
  {
    task: {
      type: Schema.Types.ObjectId,
      ref: TASK_DOCUMENT_NAME,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: USER_DOCUMENT_NAME,
      required: true,
    },
    status: {
      type: Schema.Types.String,
      enum: [TaskStatus.PENDING, TaskStatus.COMPLETE, TaskStatus.CANCEL, TaskStatus.EXPIRE],
      default: TaskStatus.PENDING,
      required: false
    },
    percentage: {
      type: Schema.Types.Number,
      default: 0,
      required: false
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

export const AssignTaskModel = model<AssignTask>(DOCUMENT_NAME, schema, COLLECTION_NAME)


// Get position goal by id 

// create a goalTask by position goal id 

// then create a task on behalf of that goalTask id 