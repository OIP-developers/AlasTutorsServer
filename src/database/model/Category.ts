import { model, Schema, Document } from 'mongoose';

export const DOCUMENT_NAME = 'Categorty';
export const COLLECTION_NAME = 'categories';

export default interface Category extends Document {
  title: string,
  isDeleted: boolean
}

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

export const CategoryModel = model<Category>(DOCUMENT_NAME, schema, COLLECTION_NAME)
