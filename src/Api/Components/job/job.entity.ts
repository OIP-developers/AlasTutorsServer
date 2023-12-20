import mongoose, { model, Schema, Document } from 'mongoose';
import Business, { BUSINESS_COLLECTION_NAME } from "../business/business"
import { USER_COLLECTION_NAME, User } from "../../../database/model/User"
import { JobStatus } from '../../../enums/enums';
import { ObjectId } from '../../../../constants';

export const JOB_DOCUMENT_NAME = 'Job';
export const JOB_COLLECTION_NAME = 'jobs';

 class applicationQuestions {
  enteredQuestions: string = "" ;
  isCoverLetterRequired: boolean = true ;
  isEmailRequired: boolean = true; 
  isHomeAddressRequired: boolean = true; 
  isNameRequired: boolean = true; 
  isPhoneNumberRequired: boolean = true; 
  isPortfolioLinkRequired: boolean = true; 
  isResumeRequired: boolean = true;  
  isApplicationSourceRequired: boolean = true;  
}
export default class Job implements IJob {
  _id :Schema.Types.ObjectId = new ObjectId('')
  applicationQuestions : applicationQuestions = new applicationQuestions() 
  department: string = "";
  enteredInterviewQuestions: string= "";
  jobTitle: string = "";
  jobDescription: string = "";
  jobType: string = "";
  location: string = "";
  openings: number = 1;
  salary: string = "";
  salaryRate: string = "";
  skills: string = "";
  status : string = JobStatus.open;
  businessId : Schema.Types.ObjectId | Business | null = new ObjectId('');
  userId : Schema.Types.ObjectId | User | null = new ObjectId('');
  urlCode : string = "";
}

export interface IJob {
  _id :Schema.Types.ObjectId 
  applicationQuestions:{
    enteredQuestions : string;
    isCoverLetterRequired : boolean;
    isEmailRequired : boolean;
    isHomeAddressRequired : boolean;
    isNameRequired : boolean;
    isPhoneNumberRequired : boolean;
    isPortfolioLinkRequired : boolean;
    isApplicationSourceRequired : boolean;
    isResumeRequired : boolean;
  }

  department : string;
  enteredInterviewQuestions : string;
  jobDescription : string;
  jobTitle : string;
  jobType : string;
  location : string;
  openings : number;
  salary : string;
  salaryRate : string;
  skills : string;
  businessId : Schema.Types.ObjectId | Business | null;
  userId : Schema.Types.ObjectId | User | null;
  status : string;
  urlCode : string;
}

const schema = new Schema<IJob> (
  {
    businessId: { type: Schema.Types.ObjectId, ref: BUSINESS_COLLECTION_NAME, required: true},
    userId: { type: Schema.Types.ObjectId, ref: USER_COLLECTION_NAME , required: true},
    department: { type: Schema.Types.String, required: true },
    enteredInterviewQuestions: [{ type: Schema.Types.String}],
    jobDescription : { type: Schema.Types.String, required: true },
    jobTitle : { type: Schema.Types.String, required: true },
    jobType : { type: Schema.Types.String, required: true },
    location : { type: Schema.Types.String, required: true },
    openings : { type: Schema.Types.Number, required: true, default: 1 },
    salary : { type: Schema.Types.String, required: true },
    salaryRate : { type: Schema.Types.String, required: true },
    skills: [{ type: Schema.Types.String, required: true}],
    status : { type: Schema.Types.String, required: true, enum : {values :[ JobStatus.open, JobStatus.close ]}, default : JobStatus.open  },
    urlCode : { type: Schema.Types.String, required: true, minlength : 5 },
    
    applicationQuestions:{
      enteredQuestions : [{ type: Schema.Types.String}],
      isCoverLetterRequired : { type: Schema.Types.Boolean, required: true },
      isEmailRequired : { type: Schema.Types.Boolean, required: true },
      isHomeAddressRequired : { type: Schema.Types.Boolean, required: true },
      isNameRequired : { type: Schema.Types.Boolean, required: true },
      isPhoneNumberRequired : { type: Schema.Types.Boolean, required: true },
      isPortfolioLinkRequired : { type: Schema.Types.Boolean, required: true },
      isApplicationSourceRequired : { type: Schema.Types.Boolean, required: true },
      isResumeRequired : { type: Schema.Types.Boolean, required: true },
    },
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export const JobModel = model<IJob>(JOB_DOCUMENT_NAME, schema, JOB_COLLECTION_NAME)
