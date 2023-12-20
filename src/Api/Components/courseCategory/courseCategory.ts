import { Document, Schema, model } from 'mongoose';

export const DOCUMENT_NAME = 'courseCategory';
export const COLLECTION_NAME = 'courseCategories';

export interface IcourseCategory {
  title: string,
  isDeleted: boolean,
}

export default interface courseCategory extends Document, IcourseCategory { }

const schema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
      unique: true
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

export const courseCategoryModel = model<courseCategory>(DOCUMENT_NAME, schema, COLLECTION_NAME)