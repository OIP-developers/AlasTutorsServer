import { model, Schema, Document } from 'mongoose';

export const DOCUMENT_NAME = 'User';
export const COLLECTION_NAME = 'users';

enum USER_TYPE {
  TEACHER = "TEACHER",
  PARENT = "PARENT",
  STUDENT = "STUDENT"
}

enum USER_STATUS {
  SUSPENDED = "SUSPENDED",
  DISABLED = "DISABLED",
  ACTIVE = "ACTIVE"
}

enum GENDER {
  MALE = "MALE",
  FEMALE = "FEMALE",
  NON_BINARY = "NON_BINARY"
}

export default interface User extends Document {
  first_name: string
  middle_name: string
  last_name: string
  email: string
  password: string
  type: USER_TYPE.TEACHER
}

const schema = new Schema(
  {
    first_name: {
      type: Schema.Types.String,
      required: true
    },
    middle_name: {
      type: Schema.Types.String,
      required: false
    },
    last_name: {
      type: Schema.Types.String,
      required: true
    },
    type: {
      type: Schema.Types.String,
      required: true,
      enum: [USER_TYPE.PARENT, USER_TYPE.STUDENT, USER_TYPE.TEACHER]
    },
    email: {
      type: Schema.Types.String,
      required: false,
      unique: true,
      trim: true,
      select: false,
    },
    password: {
      type: Schema.Types.String,
      required: false,
      select: false,
    },
    gender: {
      type: Schema.Types.String,
      required: true,
      enum: [GENDER.MALE, GENDER.FEMALE, GENDER.NON_BINARY],
      default: GENDER.MALE
    },
    status:{
      type: Schema.Types.String,
      required: true,
      enum: [USER_STATUS.ACTIVE, USER_STATUS.SUSPENDED, USER_STATUS.DISABLED],
      default: USER_STATUS.ACTIVE
    }
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const UserModel = model<User>(DOCUMENT_NAME, schema, COLLECTION_NAME);