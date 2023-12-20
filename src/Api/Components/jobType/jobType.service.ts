import { DataCopier } from "../../../utils/dataCopier";
import { IJobTypeService } from './ijobType.service';
import { inject, injectable } from 'inversify';
import User from '../../../database/model/User';
import { BadRequestError, ForbiddenError, NoDataError } from '../../../core/ApiError';
import SERVICE_IDENTIFIER from '../../../identifiers';
import { CreateJobTypePayloadDTO } from '../../../Interface/payloadInterface/JobType';
import { CreateJobTypeDTO, GetaAllJobTypesDTO } from './jobType.dto';
import IJobTypeRepository from './ijobType.repository';
import JobType from './jobType.entity';


@injectable()
export class JobTypeService implements IJobTypeService {

  constructor(
    @inject(SERVICE_IDENTIFIER.JobTypeRepository)
    private jobTypeRepository: IJobTypeRepository
  ){}


  async add(createJobTypeDTO: CreateJobTypePayloadDTO, userData: User) : Promise<CreateJobTypeDTO>  {
    let JobData = DataCopier.assignToTarget(createJobTypeDTO, userData)
    const addJobData = DataCopier.copy(JobType , JobData)
    let result!: CreateJobTypeDTO
    try {
      result = await this.jobTypeRepository.create(addJobData)
    } catch (error) {
      throw new BadRequestError('Job cannot be created')
    }
    return result
  }
  
  async getaAllJobTypes() : Promise<GetaAllJobTypesDTO[]>  {
    let result!: GetaAllJobTypesDTO[]
    try {
      const jobTypes = await this.jobTypeRepository.find({})
      result = DataCopier.copyArrayOfObjects(GetaAllJobTypesDTO, jobTypes)
    } catch (error) {
      throw new BadRequestError('Job cannot be created')
    }
    return result
  }

  
}