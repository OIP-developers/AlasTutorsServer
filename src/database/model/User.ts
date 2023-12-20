import { model, Schema, Document } from 'mongoose';
import Role, { Permissions } from './Role';
import { BUSINESS_DOCUMENT_NAME } from '../../Api/Components/business/business';
import { DOCUMENT_NAME as RolesDocumentName } from '../../database/model/Role';

export const USER_DOCUMENT_NAME = 'User';
export const USER_COLLECTION_NAME = 'users';
export const INSTRUCTOR_PERMISSION = "Create Courses"


export class User extends Document implements IUser {
  id: Schema.Types.ObjectId ;
  name: string = '';
  google_id?: string | undefined = '';
  facebook_id?: string | undefined = '';
  stripe_customerId: string | null = '';
  email?: string | undefined = '';
  password?: string | null | undefined = '';
  profilePicUrl?: string | undefined = '';
  role?: Role | undefined ;
  verified?: boolean | undefined = true;
  status?: boolean | undefined = true;
  createdAt: Date = new Date();
  updatedAt?: Date | undefined = new Date();
  first_name: string = '';
  last_name: string = '';
  date_of_birth: Date = new Date() ;
  phone: string = '';
  address: { longitude: string; latitude: string; detail: string; };
  business: string = '';
  country: string = '';
  city: string = '';
  state: string = '';
  postal_code: string = '';
  bio: string = '';
  gender: string = '';
  skills: string = '';
  website: string = '';
  facebook_link: string = '';
  linkedin_link: string = '';
  instagram_link: string = '';
  twitter_link: string = '';
  life_experience: string = '';
  designation: string = '';
  is_mentor: string = '';
  permissions?: string[] | undefined = [];
  createdBy?: string | undefined = '';
  businessQuestionsAnswered: boolean = false;
}

export default interface IUser extends Document {
  id: Schema.Types.ObjectId,
  name: string;
  google_id?: string;
  facebook_id?: string;
  stripe_customerId: string | null;
  email?: string;
  password?: string | null;
  profilePicUrl?: string;
  role?: Role;
  verified?: boolean;
  status?: boolean;
  createdAt: Date;
  updatedAt?: Date;
  // meta
  first_name: string,
  last_name: string,
  date_of_birth: Date,
  phone: string,
  address: {
    longitude: string,
    latitude: string,
    detail: string,
  },
  business: string,
  country: string,
  city: string,
  state: string,
  postal_code: string,
  bio: string,
  gender: string,
  skills: string,
  website: string,
  facebook_link: string,
  linkedin_link: string,
  instagram_link: string,
  twitter_link: string,
  life_experience: string,
  designation: string,
  is_mentor: string,
  permissions?: string[],
  createdBy?: string,
  businessQuestionsAnswered: boolean,
}

const schema = new Schema(
  {
    google_id: {
      type: Schema.Types.String,
      required: false,
    },
    facebook_id: {
      type: Schema.Types.String,
      required: false,
    },
    name: {
      type: Schema.Types.String,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: Schema.Types.String,
      required: false,
      unique: true,
      trim: true,
      select: false,
    },
    password: {
      type: Schema.Types.String,
      required: false,
      select: false,
    },
    profilePicUrl: {
      type: Schema.Types.String,
      required: false,
      trim: true,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: RolesDocumentName,
      required: true,
    },
    business: {
      type: Schema.Types.ObjectId,
      ref: BUSINESS_DOCUMENT_NAME,
      required: true,
    },

    first_name: { type: Schema.Types.String, required: false },
    last_name: { type: Schema.Types.String, required: false },
    date_of_birth: { type: Schema.Types.Date, required: false },
    phone: { type: Schema.Types.String, required: false },
    address: {
      longitude: { type: Schema.Types.String, required: false },
      latitude: { type: Schema.Types.String, required: false },
      detail: { type: Schema.Types.String, required: false },
    },
    country: { type: Schema.Types.String, required: false },
    city: { type: Schema.Types.String, required: false },
    state: { type: Schema.Types.String, required: false },
    postal_code: { type: Schema.Types.String, required: false },
    bio: { type: Schema.Types.String, required: false },
    gender: { type: Schema.Types.String, required: false },
    skills: { type: Schema.Types.String, required: false },
    website: { type: Schema.Types.String, required: false },
    facebook_link: { type: Schema.Types.String, required: false },
    linkedin_link: { type: Schema.Types.String, required: false },
    instagram_link: { type: Schema.Types.String, required: false },
    twitter_link: { type: Schema.Types.String, required: false },
    life_experience: { type: Schema.Types.String, required: false },
    designation: { type: Schema.Types.String, required: false },
    is_mentor: { type: Schema.Types.String, required: false },
    permissions: [{ type: Schema.Types.Mixed, required: false, enum: [Permissions.ANNOTATE_FILES, Permissions.BECOME_A_MENTOR, Permissions.BRAND_CULTURE_STRATEGY, Permissions.COMMENT, Permissions.CREATE_CAMPAIGN, Permissions.CREATE_COURSES, Permissions.CREATE_EVENTS, Permissions.CREATE_FOLDERS, Permissions.CREATE_POLLS, Permissions.CREATE_RESOURCE_GROUP, Permissions.CREATE_REWARDS_PROGRAM, Permissions.CREATE_SURVEYS, Permissions.CREATE_TASKS, Permissions.CREATE_WORKSPACE, Permissions.DOWNLOAD_FILES, Permissions.MANAGE_AGENDA, Permissions.MANAGE_BRAND_ASSETS, Permissions.REVIEW, Permissions.SHARE_FOR_REVIEW, Permissions.UPLOAD_FILES, Permissions.USE_PEN_ERASE, Permissions.VOTE_IN_POLLS] }],
    createdBy: { type: Schema.Types.ObjectId, required: false },

    businessQuestionsAnswered: {
      type: Schema.Types.Boolean,
      required: true,
      default: false
    },

    verified: {
      type: Schema.Types.Boolean,
      default: false,
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      required: true,
      select: false,
    },
    updatedAt: {
      type: Date,
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

export const UserModel = model<IUser>(USER_DOCUMENT_NAME, schema, USER_COLLECTION_NAME);

//TODO: Create mechanism of default password. 
