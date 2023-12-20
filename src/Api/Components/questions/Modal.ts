import { model, Schema, Document } from 'mongoose';

export const DOCUMENT_NAME = 'Question';
export const COLLECTION_NAME = 'Questions';

export interface QuestionModal {
  heading: string;
  options: [{
    subHeading: string;
    subOptions: [{
      value: string;
      name: string;
      isChecked?: boolean;
    }]
  }];
}

export default interface DocumentModal extends Document, QuestionModal { }

const schema = new Schema({
  heading: {
    type: String,
    required: true,
  },
  options: [{
    subHeading: {
      type: String,
      required: true,
    },
    subOptions: [{
      value: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      isChecked: {
        type: Schema.Types.Boolean,
        required: false,
        default: false
      },
    }]

  }],
},
  {
    versionKey: false,
    timestamps: true
  }
)

export const Modal = model<DocumentModal>(DOCUMENT_NAME, schema, COLLECTION_NAME)
