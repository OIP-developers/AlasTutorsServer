// import { ISchedule } from "../job/Schedule"
// import { IAssignSchedule } from "../job/AssignedSchedule"
import ScheduleRepo from './schedule.repository';
import { DataCopier } from "../../../utils/dataCopier";
import { SuccessResponse, SuccessMsgResponse } from '../../../core/ApiResponse';
import Schedule  from './schedule.entity';
import { IScheduleService } from './ischedule.service';
import { inject, injectable } from 'inversify';
import IScheduleRepository from './ischedule.repository';
// import { CreateSchedulePayloadDTO } from '../../../Interface/payloadInterface/Schedule';
import User from '../../../database/model/User';
import { BadRequestError, ForbiddenError, NoDataError } from '../../../core/ApiError';
import { IDataManipulationService } from '../../../Services/interfaces/ijob.service';
import SERVICE_IDENTIFIER from '../../../identifiers';
// import { ScheduleStatus } from '../../../enums/enums';
// import { Schema } from 'mongoose';
// import { ScheduleDTO, SchedulesTitleDTO } from '../../../dto/job.dto';
import { CreatedByAndBusinessIdDTO } from '../../../dto/index.dto';
import RecruitmentInterview from '../recruitmentInterview/recruitmentInterview.entity';
import { toAndFromTimeDTO } from './schedule.dto';
import { AddRecruitmentInterviewDataValidationSchema, ToAndFromTimeDTOValidationSchema } from '../../../validations/payloadSchema/ScheduleSchema';
import { ScheduleEnums } from '../../../enums/schedule.enum';
import { validate } from '../../../../decorators';
import Joi from 'joi';
import { CreatedByAndBusinessIdValidationSchema } from '../../../validations/commonSchema';


@injectable()
export class ScheduleService implements IScheduleService {

  constructor(
    @inject(SERVICE_IDENTIFIER.ScheduleRepository)
    private scheduleRepository: IScheduleRepository,
    
  ){}

  @validate([
    AddRecruitmentInterviewDataValidationSchema,
    ToAndFromTimeDTOValidationSchema,
    CreatedByAndBusinessIdValidationSchema
  ])

  async addRecruitmentInterviewSchedule(
    addRecruitmentInterviewData: RecruitmentInterview, 
    toAndFromTime : toAndFromTimeDTO, 
    createdByAndBusinessId: CreatedByAndBusinessIdDTO) : Promise<any>  {

    let ScheduleData = DataCopier.copy(Schedule, {
     data : addRecruitmentInterviewData, 
      ...toAndFromTime, 
      ...createdByAndBusinessId
      })

      ScheduleData.associatedUsers = addRecruitmentInterviewData.hosts
      ScheduleData.type = ScheduleEnums.RecruitmentInterview

    let result!: Schedule
    try {
      result = await this.scheduleRepository.create(ScheduleData)
    } catch (error) {
      console.log(error)
       throw new BadRequestError('Schedule cannot be created')
    }
    return result
  }

}