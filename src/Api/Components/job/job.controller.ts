import { Response, NextFunction } from "express"
import asyncHandler from "../../../helpers/async";
import { SuccessResponse} from '../../../core/ApiResponse';
import _ from 'lodash';
import { IJobService } from './ijob.service';
import { resolve } from "../../../dependencymanagement"
import SERVICE_IDENTIFIER from "../../../identifiers";
import { CreateJobPayloadDTO } from '../../../Interface/payloadInterface/Job';
import User from '../../../database/model/User';
import { BadRequestError } from "../../../core/ApiError";
import Job from "./job.entity";




export class JobController {

  getJobService(): IJobService {
    return resolve<IJobService>(SERVICE_IDENTIFIER.JobService);
  }

  jobService = this.getJobService();

  add = 
  asyncHandler(async (req: any, res: Response, next: NextFunction): Promise<Response | void> =>{
      let bodyData : CreateJobPayloadDTO = req.body
        const { business : {_id : businessId } , _id : userId } = req.user
        let result = await this.jobService.add(bodyData, {userId, businessId})
        new SuccessResponse('Added successfully', result).send(res);
    }
  )

  getPublicOpenJobByURL = 
  asyncHandler(async (req: any, res: Response, next: NextFunction): Promise<Response | void> =>{
      let URL_Code : string = req.params.job_url_code
        let result = await this.jobService.getPublicOpenJobByURL(URL_Code)
        new SuccessResponse('fetch successfully', result).send(res);
    }
  )

  getPublicOpenJobs = 
  asyncHandler(async (req: any, res: Response, next: NextFunction): Promise<Response | void> =>{
      const { business : {_id : businessId } } = req.user
        let result = await this.jobService.getPublicOpenJobs(businessId)
        new SuccessResponse('fetch successfully', result).send(res);
    }
  )

}
