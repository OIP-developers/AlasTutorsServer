import { model, Schema, Document } from 'mongoose';

import { USER_DOCUMENT_NAME } from '../../../database/model/User';
import { BUSINESS_DOCUMENT_NAME } from '../business/business';
import { DOCUMENT_NAME as GOAL_TASK_DOCUMENT } from '../task/GoalTask';


export const DOCUMENT_NAME = 'Workspaces';
export const COLLECTION_NAME = 'workspaces';

export interface IModal {
  name?: string;
  photoUri?: string;
  description?: string;
  business: Schema.Types.ObjectId;
  goalTask: Schema.Types.ObjectId;
  hosts: Schema.Types.ObjectId[];
  listeners?: Schema.Types.ObjectId[];
  startDate?: Schema.Types.ObjectId;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  isDeleted?: boolean;
}

export default interface DocumentModal extends Document, IModal { }

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  photoUri: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  goalTask: {
    type: Schema.Types.ObjectId,
    ref: GOAL_TASK_DOCUMENT,
    required: true,
  },
  hosts: [{ type: Schema.Types.ObjectId, ref: USER_DOCUMENT_NAME }],
  listeners: [{ type: Schema.Types.ObjectId, ref: USER_DOCUMENT_NAME }],
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  business: {
    type: Schema.Types.ObjectId,
    ref: BUSINESS_DOCUMENT_NAME,
    required: true,
  },

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

