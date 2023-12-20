import { Schema } from 'mongoose';
import { CreateRecruitmentInterviewPayloadDTO } from '../../../Interface/payloadInterface/RecruitmentInterview';
import RecruitmentInterview from './recruitmentInterview.entity';
import { CreatedByAndBusinessIdDTO } from '../../../dto/index.dto';



export interface IRecruitmentInterviewService {

   add(bodyData: CreateRecruitmentInterviewPayloadDTO, userData: CreatedByAndBusinessIdDTO) : Promise<any>
  //  getPublicOpenRecruitmentInterviewByURL(URL_Code : string) : Promise<RecruitmentInterviewDTO> 
  //  getPublicOpenRecruitmentInterviews(businessId : Schema.Types.ObjectId) : Promise<RecruitmentInterviewsTitleDTO[]> 


}
