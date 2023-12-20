// import { IJobApplication } from "../jobApplication/JobApplication"
// import { IAssignJobApplication } from "../jobApplication/AssignedJobApplication"
import JobApplicationRepo from './jobApplication.repository';
import { DataCopier } from "../../../utils/dataCopier";
import { SuccessResponse, SuccessMsgResponse } from '../../../core/ApiResponse';
import JobApplication, { JobApplicationModel, IJobApplication } from './jobApplication.entity';
import { IJobApplicationService } from './ijobApplication.service';
import { inject, injectable } from 'inversify';
import IJobApplicationRepository from './ijobApplication.repository';
import User from '../../../database/model/User';
import { BadRequestError, ForbiddenError, NoDataError } from '../../../core/ApiError';
import SERVICE_IDENTIFIER from '../../../identifiers';
import { JobApplicationStatus } from '../../../enums/enums';
import { CreateCulturefyJobApplicationPayloadDTO } from '../../../Interface/payloadInterface/JobApplication';
import { IDataManipulationService } from '../../../Services/interfaces/ijob.service';
import { ApplicationSourceEnums } from '../../../enums/applicationSource.enum';
import { DatabaseId } from '../../../../types';
import { JobApplicantsDropdownDTO } from '../../../dto/jobApplication.dto';


@injectable()
export class JobApplicationService implements IJobApplicationService {

  constructor(
    @inject(SERVICE_IDENTIFIER.JobApplicationRepository)
    private jobApplicationRepository: IJobApplicationRepository,
    
  ){}


  async add(createJobApplicationDTO: CreateCulturefyJobApplicationPayloadDTO, userData: User) : Promise<JobApplication>  {
    let JobApplicationData = DataCopier.assignToTarget(createJobApplicationDTO, userData as User)
    const addJobApplicationData = DataCopier.copy(JobApplication , JobApplicationData)
    addJobApplicationData.applicationSource = ApplicationSourceEnums.CULTUREFY
    let result!: JobApplication
    try {
      result = await this.jobApplicationRepository.create(addJobApplicationData)
    } catch (error) {
      throw new BadRequestError('JobApplication cannot be created')
    }
    return result
  }

  async getDropdownJobApplicantsByJobId(
    jobId : DatabaseId, 
    businessId : DatabaseId, 
    applicantName : string
    ) : Promise<JobApplicantsDropdownDTO[]>  {
    let result!: JobApplicantsDropdownDTO[]
    try {
      result = await this.jobApplicationRepository.getJobApplicantsByJobId( 
        jobId, 
        businessId,
        applicantName 
        )
    } catch (error) {
      throw new BadRequestError('Job Applicants cannot be fetched')
    }
    return result
  }
  
}