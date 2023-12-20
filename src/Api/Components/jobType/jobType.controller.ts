import { Response, NextFunction } from "express"
import asyncHandler from "../../../helpers/async";
import { SuccessResponse} from '../../../core/ApiResponse';
import _ from 'lodash';
import { IJobTypeService } from './ijobType.service';
import { resolve } from "../../../dependencymanagement"
import SERVICE_IDENTIFIER from "../../../identifiers";
import { CreateJobTypePayloadDTO } from '../../../Interface/payloadInterface/JobType';
import { User } from "../../../database/model/User";




export class JobTypeController {

  getJobTypeService(): IJobTypeService {
    return resolve<IJobTypeService>(SERVICE_IDENTIFIER.JobTypeService);
  }

  JobTypeService = this.getJobTypeService();

  add = 
  asyncHandler(async (req: any, res: Response, next: NextFunction): Promise<Response | void> =>{
      let bodyData : CreateJobTypePayloadDTO = req.body
        const { _id : userId } = req.user
        let result = await this.JobTypeService.add(bodyData, { userId } as unknown as User)
        new SuccessResponse('Added successfully', result).send(res);
    }
  )

  getaAllJobTypes = 
  asyncHandler(async (req: any, res: Response, next: NextFunction): Promise<Response | void> =>{
        let result = await this.JobTypeService.getaAllJobTypes()
        new SuccessResponse('fetch successfully', result).send(res);
    }
  )

}
