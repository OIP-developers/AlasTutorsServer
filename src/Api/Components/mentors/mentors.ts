import { Document, Schema, model } from "mongoose";
export const DOCUMENT_NAME = "mentor"
export const COLLECTION_NAME = "mentors"

export default interface mentor extends Document { }

const schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    name: {
      type: Schema.Types.String,
      required: true
    },
    email: {
      type: Schema.Types.String,
      required: true
    },
    designation: {
      type: Schema.Types.String,
      required: true
    },
    description: {
      type: Schema.Types.String,
      required: true
    },
    status: {
      type: Schema.Types.String,
      required: true
    },
    timestamp: {
      type: Schema.Types.String,
      required: true
    },
    incomingMentorshipRequests: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          required: true
        },
        email: {
          type: Schema.Types.String,
          required: true
        },
        status: {
          type: Schema.Types.String,
          required: true
        }
      }
    ]
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export type incomingMentorshipRequestType = {
  userId: string;
  status: mentorshipRequestStatus
}

export enum mentorshipRequestStatus {
  PENDING = "pending",
  APPROVED = "approved",
  IGNORED = "ignored"
}

// incoming mentorship request status = pending, approved, ignored
// status = approved, pending 
// designation = Manager (Default)

export const mentorModel = model<mentor>(DOCUMENT_NAME, schema, COLLECTION_NAME);