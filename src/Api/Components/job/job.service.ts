// import { IJob } from "../job/Job"
// import { IAssignJob } from "../job/AssignedJob"
import JobRepo from './job.repository';
import { DataCopier } from "../../../utils/dataCopier";
import { SuccessResponse, SuccessMsgResponse } from '../../../core/ApiResponse';
import Job from './job.entity';
import { IJobService } from './ijob.service';
import { inject, injectable } from 'inversify';
import IJobRepository from './ijob.repository';
import { CreateJobPayloadDTO } from '../../../Interface/payloadInterface/Job';
import User from '../../../database/model/User';
import { BadRequestError, ForbiddenError, NoDataError } from '../../../core/ApiError';
import { IDataManipulationService } from '../../../Services/interfaces/ijob.service';
import SERVICE_IDENTIFIER from '../../../identifiers';
import { JobStatus } from '../../../enums/enums';
import { Schema } from 'mongoose';
import { JobDTO, JobsTitleDTO } from '../../../dto/job.dto';


@injectable()
export class JobService implements IJobService {

  constructor(
    @inject(SERVICE_IDENTIFIER.JobRepository)
    private jobRepository: IJobRepository,
    
    @inject(SERVICE_IDENTIFIER.DataManipulationService)
    private dataManipulationService: IDataManipulationService
  ){}


  async add(createJobDTO: CreateJobPayloadDTO, userData: User) : Promise<JobDTO>  {
    let JobData = DataCopier.assignToTarget(createJobDTO, userData as User)
    const addJobData = DataCopier.copy(Job , JobData)
    const randomString = this.dataManipulationService.gnerateRandomString()
    addJobData.urlCode = randomString 
    let result!: Job
    try {
      result = await this.jobRepository.create(addJobData)
    } catch (error) {
      throw new BadRequestError('Job cannot be created')
    }
    return result
  }

  async getPublicOpenJobByURL(URL_Code : string) : Promise<JobDTO>  {
    let result!: Job
    try {
      result = await this.jobRepository.findOne({ urlCode: URL_Code})
    } catch (error) {
      throw new BadRequestError('Job cannot be fetched')
    }
      if(!result) throw new BadRequestError("Invalid Job URL")
      if(result.status !== JobStatus.open) throw new ForbiddenError("The Job has been Closed")
    return result
  }

  async getPublicOpenJobs(businessId : Schema.Types.ObjectId) : Promise<JobsTitleDTO[]>  {
    let result!: Job[]
    try {
      result = await this.jobRepository.getOpenJobs(businessId)
    } catch (error) {
      throw new BadRequestError('Jobs cannot be fetched')
    }
    return result
  }
  
}