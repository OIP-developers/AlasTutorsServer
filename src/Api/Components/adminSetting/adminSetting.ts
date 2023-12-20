import { model, Schema, Document } from 'mongoose';

export const DOCUMENT_NAME = 'AdminSetting';
export const COLLECTION_NAME = 'adminSettings';

export default interface AdminSetting extends Document {
  title: string,
}

const schema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
      unique: true
    }
  }
)

export const AdminSettingModel = model<AdminSetting>(DOCUMENT_NAME, schema, COLLECTION_NAME)