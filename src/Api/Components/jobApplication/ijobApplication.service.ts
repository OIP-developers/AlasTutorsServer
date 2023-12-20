import { CreateCulturefyJobApplicationPayloadDTO } from '../../../Interface/payloadInterface/JobApplication';
import { JobDTO } from '../../../dto/job.dto';
import JobApplication from './jobApplication.entity';
import { JobApplicantsDropdownDTO } from '../../../dto/jobApplication.dto';
import { DatabaseId } from '../../../../types';



export interface IJobApplicationService {

   add(bodyData: CreateCulturefyJobApplicationPayloadDTO, userData: any) : Promise<JobApplication>
   getDropdownJobApplicantsByJobId(jobId : DatabaseId, businessId : DatabaseId, applicantName : string): Promise<JobApplicantsDropdownDTO[]>


}
