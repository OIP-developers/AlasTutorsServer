import { model, Schema, Document } from 'mongoose';

export const DOCUMENT_NAME = 'SynthesiaAvatars';
export const COLLECTION_NAME = 'SynthesiaAvatars';

export default interface Synthesia extends Document {
  Name: string;
  image: string;
}

const schema = new Schema(
  {
    Name: {
      type: Schema.Types.String
    },
    image: {
      type: Schema.Types.String
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export const synthesiaModel = model<Synthesia>(DOCUMENT_NAME, schema, COLLECTION_NAME)
