import { model, Schema, Document } from 'mongoose';
import { DOCUMENT_NAME as FILE_DOCUMENT_NAME } from '../workspace/workspaceFiles/workspaceFile';
import { USER_DOCUMENT_NAME } from '../../../database/model/User';
import { DOCUMENT_NAME as WORKSPACE_DOCUMENT_NAME } from '../workspace/Modal';


export const DOCUMENT_NAME = 'Messages';
export const COLLECTION_NAME = 'messages';

export interface IModal {
  workspace: string;
  user: string;
  message: string;
  reply: [{
    reply: string;
    replyBy: string;
    like: [{
      isLiked: boolean;
      likeBy: string;
    }],
  }];
  like: [{
    isLiked: boolean;
    likeBy: string;
  }],
  isDeleted?: boolean;
}

export default interface DocumentModal extends Document, IModal { }

const schema = new Schema({
  workspace: {
    type: String,
    required: true,
    ref: WORKSPACE_DOCUMENT_NAME
  },
  user: {
    type: String,
    required: true,
    ref: USER_DOCUMENT_NAME
  },
  message: {
    type: String,
    required: true,
  },
  reply: [{
    reply: {
      type: String,
      required: false,
      default: null
    },
    replyBy: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: USER_DOCUMENT_NAME,
      default: null
    },
    like: [{
      isLiked: {
        type: Boolean,
        required: false,
        default: null
      },
      likeBy: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: USER_DOCUMENT_NAME,
        default: null
      },
    }],
    createdAt : {
      type: Date,
      required: false,
      default: Date.now
    },
  }],
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
