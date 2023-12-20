import { Schema } from 'mongoose';
import { CreateJobPayloadDTO } from '../../../Interface/payloadInterface/Job';
import Job from './job.entity';
import { JobDTO, JobsTitleDTO } from '../../../dto/job.dto';



export interface IJobService {

   add(bodyData: CreateJobPayloadDTO, userData: any) : Promise<JobDTO>
   getPublicOpenJobByURL(URL_Code : string) : Promise<JobDTO> 
   getPublicOpenJobs(businessId : Schema.Types.ObjectId) : Promise<JobsTitleDTO[]> 


}
