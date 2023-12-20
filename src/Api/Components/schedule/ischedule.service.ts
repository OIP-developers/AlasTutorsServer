import { Schema } from 'mongoose';
import { CreatedByAndBusinessIdDTO } from '../../../dto/index.dto';
import RecruitmentInterview from '../recruitmentInterview/recruitmentInterview.entity';
import { toAndFromTimeDTO } from './schedule.dto';



export interface IScheduleService {

   addRecruitmentInterviewSchedule(bodyData: RecruitmentInterview, toAndFromTime : toAndFromTimeDTO , createdByAndBusinessId: CreatedByAndBusinessIdDTO) : Promise<any>
  //  getPublicOpenScheduleByURL(URL_Code : string) : Promise<ScheduleDTO> 
  //  getPublicOpenSchedules(businessId : Schema.Types.ObjectId) : Promise<SchedulesTitleDTO[]> 


}
