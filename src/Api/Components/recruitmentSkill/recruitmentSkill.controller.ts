import { Response, NextFunction } from "express"
import asyncHandler from "../../../helpers/async";
import { SuccessResponse} from '../../../core/ApiResponse';
import _ from 'lodash';
import { IRecruitmentSkillService } from './irecruitmentSkill.service';
import { resolve } from "../../../dependencymanagement"
import SERVICE_IDENTIFIER from "../../../identifiers";
import { CreateRecruitmentSkillPayloadDTO } from '../../../Interface/payloadInterface/RecruitmentSkill';


export class RecruitmentSkillController {

  getSkillService(): IRecruitmentSkillService {
    return resolve<IRecruitmentSkillService>(SERVICE_IDENTIFIER.RecruitmentSkillService);
  }
  
  skillService = this.getSkillService();

  add = 
  asyncHandler(async (req: any, res: Response, next: NextFunction): Promise<Response | void> =>{
      let bodyData : CreateRecruitmentSkillPayloadDTO = req.body
        const { business : {_id : businessId } , _id : userId } = req.user
        let result = await this.skillService.add(bodyData, {userId, businessId})
        new SuccessResponse('Added successfully', result).send(res);
    }
  )

}
