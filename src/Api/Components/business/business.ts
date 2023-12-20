import { model, Schema, Document } from 'mongoose';

export const BUSINESS_DOCUMENT_NAME = 'Businesses';
export const BUSINESS_COLLECTION_NAME = 'businesses';

export default interface Business extends Document, IBusiness { }

export interface IBusiness {
  name: string
  logo: string
  email?: string
  website?: string
  location?: string
  facebook_link?: string
  linkedin_link?: string
  instagram_link?: string
  twitter_link?: string
}

const schema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      default: "Culturefy"
    },
    logo: {
      type: Schema.Types.String,
      required: true
    },
    email: {
      type: Schema.Types.String,
      required: false
    },
    website: {
      type: Schema.Types.String,
      required: false
    },
    location: {
      type: Schema.Types.String,
      required: false
    },
    facebook_link: { type: Schema.Types.String, required: false },
    linkedin_link: { type: Schema.Types.String, required: false },
    instagram_link: { type: Schema.Types.String, required: false },
    twitter_link: { type: Schema.Types.String, required: false },
  }
)

export const BusinessModal = model<Business>(BUSINESS_DOCUMENT_NAME, schema, BUSINESS_COLLECTION_NAME)