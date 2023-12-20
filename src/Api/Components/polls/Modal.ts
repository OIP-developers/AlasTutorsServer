import { model, Schema, Document } from 'mongoose';
import { USER_DOCUMENT_NAME } from '../../../database/model/User';
import { DOCUMENT_NAME as WORKSPACE_DOCUMENT_NAME } from '../workspace/Modal';

export const DOCUMENT_NAME = 'WorkspacesPolls';
export const COLLECTION_NAME = 'workspacesPolls';

export interface IModal {
  workspace: string;
  queation: string;
  allow: boolean;
  answers: [{
    answer: string;
    count: number;
    answerBy: [string];
  }];
}

export default interface DocumentModal extends Document, IModal { }

const schema = new Schema({
  workspace: {
    type: Schema.Types.ObjectId,
    ref: WORKSPACE_DOCUMENT_NAME,
    required: true,
  },
  question: {
    type: Schema.Types.String,
    // ref: USER_DOCUMENT_NAME,
    required: true,
  },
  allow: {
    type: Schema.Types.Boolean,
    // ref: USER_DOCUMENT_NAME,
    required: false,
    default: false
  },
  answers: [{
    answer: {
      type: Schema.Types.String,
      // ref: USER_DOCUMENT_NAME,
      required: true,
    },
    count: {
      type: Schema.Types.Number,
      // ref: USER_DOCUMENT_NAME,
      required: false,
      default: 0
    },
    answerBy: {
      type: [Schema.Types.String],
      ref: USER_DOCUMENT_NAME,
      required: true,
    },
  }],
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: USER_DOCUMENT_NAME,
  //   required: false,
  // },

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

