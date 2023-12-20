import { model, Schema, Document } from 'mongoose';

export const DOCUMENT_NAME = 'SynthesiaLanguages';
export const COLLECTION_NAME = 'SynthesiaLanguages';

export default interface Synthesia extends Document {
  Name: string;
  Language: string;
  Gender: string;
}

const schema = new Schema(
  {
    Name: {
      type: Schema.Types.String
    },
    Language: {
      type: Schema.Types.String
    },
    Gender: {
      type: Schema.Types.String
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export const synthesiaModel = model<Synthesia>(DOCUMENT_NAME, schema, COLLECTION_NAME)
