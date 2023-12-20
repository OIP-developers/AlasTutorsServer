import { model, Schema, Document } from 'mongoose';

export const DOCUMENT_NAME = 'SynthesiaTemplates';
export const COLLECTION_NAME = 'SynthesiaTemplates';

interface Variables extends Document {
  id: string;
  label: string;
  type: string;
}

export default interface Synthesia extends Document {
  title: string;
  variables: Variables[];
  createdAt: number;
  lastUpdatedAt: number;
}

const schema = new Schema(
  {
    title: {
      type: Schema.Types.String
    },
    variables: {
      type: Schema.Types.Mixed
    },
    createdAt: {
      type: Schema.Types.Number
    },
    lastUpdatedAt: {
      type: Schema.Types.Number
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export const synthesiaModel = model<Synthesia>(DOCUMENT_NAME, schema, COLLECTION_NAME)
