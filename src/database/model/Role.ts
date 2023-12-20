import { Schema, model, Document } from 'mongoose';

export const DOCUMENT_NAME = 'Role';
export const COLLECTION_NAME = 'roles';

export const enum RoleCode {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  INSTRUCTOR = 'INSTRUCTOR',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  ANONYMOUS = 'ANONYMOUS',
}

export default interface Role extends Document {
  code: RoleCode;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema(
  {
    code: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      enum: [RoleCode.SUPER_ADMIN, RoleCode.ADMIN, RoleCode.INSTRUCTOR, RoleCode.TEACHER, RoleCode.STUDENT, RoleCode.ANONYMOUS],
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      required: true,
      select: false,
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

export const RoleModel = model<Role>(DOCUMENT_NAME, schema, COLLECTION_NAME);
