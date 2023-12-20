import { Response, NextFunction } from "express"
import asyncHandler from "../../../helpers/async";
import { SuccessResponse} from '../../../core/ApiResponse';
import _ from 'lodash';
import { IRecruitmentInterviewService } from './irecruitmentInterview.service';
import { resolve } from "../../../dependencymanagement"
import SERVICE_IDENTIFIER from "../../../identifiers";
import { CreateRecruitmentInterviewPayloadDTO } from '../../../Interface/payloadInterface/RecruitmentInterview';
import { CreatedByAndBusinessIdDTO } from '../../../dto/index.dto';


export class RecruitmentInterviewController {

  getRecruitmentInterviewService(): IRecruitmentInterviewService {
    return resolve<IRecruitmentInterviewService>(SERVICE_IDENTIFIER.RecruitmentInterviewService);
  }

  recruitmentInterviewService = this.getRecruitmentInterviewService();

  add = 
   asyncHandler(async (req: any, res: Response, next: NextFunction): Promise<Response | void> =>{
      let bodyData : CreateRecruitmentInterviewPayloadDTO = req.body
        const { business : {_id : businessId } , _id : createdBy } = req.user
        let result = await this.recruitmentInterviewService.add( bodyData, {createdBy, businessId} )
        new SuccessResponse('Added successfully', result).send(res);
    }
  )

  // getPublicOpenRecruitmentInterviewByURL = 
  // asyncHandler(async (req: any, res: Response, next: NextFunction): Promise<Response | void> =>{
  //     let URL_Code : string = req.params.job_url_code
  //       let result = await this.jobService.getPublicOpenRecruitmentInterviewByURL(URL_Code)
  //       new SuccessResponse('fetch successfully', result).send(res);
  //   }
  // )

  // getPublicOpenRecruitmentInterviews = 
  // asyncHandler(async (req: any, res: Response, next: NextFunction): Promise<Response | void> =>{
  //     const { business : {_id : businessId } } = req.user
  //       let result = await this.jobService.getPublicOpenRecruitmentInterviews(businessId)
  //       new SuccessResponse('fetch successfully', result).send(res);
  //   }
  // )

}
