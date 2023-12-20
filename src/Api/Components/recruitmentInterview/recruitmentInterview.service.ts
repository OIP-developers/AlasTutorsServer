// import { IRecruitmentInterview } from "../job/RecruitmentInterview"
// import { IAssignRecruitmentInterview } from "../job/AssignedRecruitmentInterview"
import { DataCopier } from "../../../utils/dataCopier";
import { SuccessResponse, SuccessMsgResponse } from '../../../core/ApiResponse';
import RecruitmentInterview from './recruitmentInterview.entity';
import { IRecruitmentInterviewService } from './irecruitmentInterview.service';
import { inject, injectable } from 'inversify';
import { CreateRecruitmentInterviewPayloadDTO } from '../../../Interface/payloadInterface/RecruitmentInterview';
import User from '../../../database/model/User';
import { BadRequestError, ForbiddenError, NoDataError } from '../../../core/ApiError';
import { IDataManipulationService } from '../../../Services/interfaces/ijob.service';
import SERVICE_IDENTIFIER from '../../../identifiers';
import { CreatedByAndBusinessIdDTO } from '../../../dto/index.dto';
import { IScheduleService } from "../schedule/ischedule.service";
import { toAndFromTimeDTO } from '../schedule/schedule.dto';
import { CreatedByAndBusinessIdValidationSchema } from '../../../validations/commonSchema';


@injectable()
export class RecruitmentInterviewService implements IRecruitmentInterviewService {

  constructor(
    
    @inject(SERVICE_IDENTIFIER.ScheduleService)
    private scheduleService: IScheduleService ,

    @inject(SERVICE_IDENTIFIER.DataManipulationService)
    private dataManipulationService: IDataManipulationService

  ){}

  async add(createRecruitmentInterviewDTO: CreateRecruitmentInterviewPayloadDTO, createdByAndBusinessId: CreatedByAndBusinessIdDTO) : Promise<any>  {
    const addRecruitmentInterviewData = DataCopier.copy(RecruitmentInterview, createRecruitmentInterviewDTO)
    addRecruitmentInterviewData.urlCode = this.dataManipulationService.gnerateRandomString()
    const toAndFromTime = DataCopier.copy(toAndFromTimeDTO, createRecruitmentInterviewDTO)
    let result!: RecruitmentInterview

    try {
      result = await this.scheduleService.addRecruitmentInterviewSchedule(
        addRecruitmentInterviewData, 
        toAndFromTime, 
        createdByAndBusinessId
        )
    } catch (error) {
      throw new BadRequestError('Recruitment Interview cannot be created')
    }
    return result
  }
}