import mongoose ,{ Schema  } from 'mongoose';
import { USER_COLLECTION_NAME, User } from "../../../database/model/User"
import { ObjectId } from '../../../../constants';
import Job, { JOB_COLLECTION_NAME } from '../job/job.entity';
import { JOB_APPLICATION_COLLECTION_NAME } from '../jobApplication/jobApplication.entity';

export const RECRUITMENT_INTERVIEW_DOCUMENT_NAME = 'RecruitmentInterview';
export const RECRUITMENT_INTERVIEW_COLLECTION_NAME = 'recruitmentInterviews';


export default class RecruitmentInterview implements IRecruitmentInterview 
{
  jobId : Schema.Types.ObjectId | Job | null = new ObjectId('');
  hosts: Schema.Types.ObjectId[] | User[] = [];
  invitedCandidates: Schema.Types.ObjectId[] = [];
  urlCode : string = '';
}

export interface IRecruitmentInterview {
    jobId: Schema.Types.ObjectId | Job | null, 
    hosts: Schema.Types.ObjectId[] | User[] | [] | null,
    invitedCandidates: Schema.Types.ObjectId[],
    urlCode: string;
}


const recruitmentInterviewDataSchema = new Schema<IRecruitmentInterview>({
  jobId: { type: Schema.Types.ObjectId, required : true , ref : JOB_COLLECTION_NAME },
  hosts: [{ type: Schema.Types.ObjectId , required : true , ref : USER_COLLECTION_NAME }],
  invitedCandidates: [{ type: Schema.Types.ObjectId , required : true , ref : JOB_APPLICATION_COLLECTION_NAME }],
  urlCode: { type: Schema.Types.String , required : true },
},{ _id: false });


export const RecruitmentInterviewModel = mongoose.model('RecruitmentInterviewData', recruitmentInterviewDataSchema);

