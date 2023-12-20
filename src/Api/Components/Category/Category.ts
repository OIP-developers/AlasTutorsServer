import { model, Schema, Document } from 'mongoose';
import { RoleCode } from '../../../database/model/Role';

export const DOCUMENT_NAME = 'Categorty';
export const COLLECTION_NAME = 'categories';

export default interface Category extends Document, ICategory { }

export interface ICategory {
  title: string,
  sort: number,
  icon: string,
  role: string,
  isDeleted: boolean,
}


const schema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      unique: true
    },
    sort: {
      type: Schema.Types.Number,
      default: 1,
      required: true,
      unique: true
    },
    icon: {
      type: String,
      required: true,
    },
    type: {
      type: Schema.Types.String,
      enum: ["BRAND", "PERSONAL"],
      default: "BRAND"
    },
    role: {
      type: Schema.Types.String,
      enum: [RoleCode.ADMIN, RoleCode.USER],
      default: RoleCode.ADMIN
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

export const CategoryModel = model<Category>(DOCUMENT_NAME, schema, COLLECTION_NAME)
