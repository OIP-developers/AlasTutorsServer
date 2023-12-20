import { Response, NextFunction } from "express"
import asyncHandler from "../../../helpers/async";
import { SuccessResponse} from '../../../core/ApiResponse';
import _ from 'lodash';
import { ISalaryFrequencyService } from './isalaryFrequency.service';
import { resolve } from "../../../dependencymanagement"
import SERVICE_IDENTIFIER from "../../../identifiers";
import { CreateSalaryFrequencyPayloadDTO } from '../../../Interface/payloadInterface/SalaryFrequency';
import { User } from "../../../database/model/User";




export class SalaryFrequencyController {

  getSalaryFrequencyService(): ISalaryFrequencyService {
    return resolve<ISalaryFrequencyService>(SERVICE_IDENTIFIER.SalaryFrequencyService);
  }

  SalaryFrequencyService = this.getSalaryFrequencyService();

  add = 
  asyncHandler(async (req: any, res: Response, next: NextFunction): Promise<Response | void> =>{
      let bodyData : CreateSalaryFrequencyPayloadDTO = req.body
        const { _id : userId } = req.user
        let result = await this.SalaryFrequencyService.add(bodyData, { userId } as unknown as User)
        new SuccessResponse('Added successfully', result).send(res);
    }
  )

  getaAllSalaryFrequencys = 
  asyncHandler(async (req: any, res: Response, next: NextFunction): Promise<Response | void> =>{
        let result = await this.SalaryFrequencyService.getaAllSalaryFrequencys()
        new SuccessResponse('fetch successfully', result).send(res);
    }
  )

}
