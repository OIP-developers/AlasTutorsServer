import { model, Schema, Document } from 'mongoose';
import { DOCUMENT_NAME as FILE_DOCUMENT_NAME } from '../workspace/workspaceFiles/workspaceFile';
import { USER_DOCUMENT_NAME } from '../../../database/model/User';
// import { DOCUMENT_NAME as WORKSPACE_FOLDER_DOCUMENT_NAME } from './workspaceFolder';

export const DOCUMENT_NAME = 'Comments';
export const COLLECTION_NAME = 'comments';

export interface IModal {
  file: string;
  fileType: string;
  annotation: [{
    type: string;
    position: string;
    timeStamp: string;
    comment: string;
  }],
  comments: [{
    comment: string;
    commentBy: string;
    reply: [{
      answer: string;
      answerBy: string
    }],
    like: [{
      isLiked: boolean;
      likeBy: string;
    }],
  }];
  isDeleted?: boolean;
}

export default interface DocumentModal extends Document, IModal { }

const schema = new Schema({
  file: {
    type: String,
    required: true,
    ref: FILE_DOCUMENT_NAME
  },
  fileType: {
    type: String,
    required: false,
    default: null,
    enum: ["comments","annotation"]
  },
  annotation: [{
    type: {
      type: String,
      required: false,
      default: null
    },
    position: {
      type: String,
      required: false,
      default: null
    },
    timeStamp: {
      type: String,
      required: false,
      default: null
    },
    comment: {
      type: String,
      required: false,
      default: null
    },
  }],
  comments: [{
    comment: {
      type: String,
      required: false,
      default: null
    },
    commentBy: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: USER_DOCUMENT_NAME,
      default: null
    },
    like: [{
      isLiked: {
        type: Boolean,
        required: false,
        default: true
      },
      likeBy: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: USER_DOCUMENT_NAME,
        default: null
      },
    }],
    reply: [{
      answer: {
        type: String,
        required: false,
        default: null
      },
      answerBy: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: USER_DOCUMENT_NAME,
        default: null
      },
    }]
  }],
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
