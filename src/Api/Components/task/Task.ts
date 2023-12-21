import { model, Schema, Document } from 'mongoose';

export const DOCUMENT_NAME = 'Task';
export const COLLECTION_NAME = 'tasks';

export default interface Task extends Document, ITask { }

export interface ITask {
  title: string,
  description: string,
  dueDate: string,
  isDeleted: boolean,
}

const schema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      unique: true
    },
    description: {
      type: Schema.Types.String,
      required: true,
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
