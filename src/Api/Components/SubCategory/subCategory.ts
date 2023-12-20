import { model, Schema, Document } from 'mongoose';
import { DOCUMENT_NAME as CATEGORY_DOCUMENT_NAME } from '../Category/Category';

export const DOCUMENT_NAME = 'subCategorty';
export const COLLECTION_NAME = 'subCategories';

export default interface subCategory extends Document {
  title: string;
  category: string;
  isDeleted: boolean;
}

const schema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
      unique: true
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: CATEGORY_DOCUMENT_NAME,
      required: true,
    },
    icon: {
      type: String,
      required: true,
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

export const subCategoryModel = model<subCategory>(DOCUMENT_NAME, schema, COLLECTION_NAME)
