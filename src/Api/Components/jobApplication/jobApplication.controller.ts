import { Response, NextFunction } from "express"
import asyncHandler from "../../../helpers/async";
import { SuccessResponse } from '../../../core/ApiResponse';
import _ from 'lodash';
import { IJobApplicationService } from './ijobApplication.service';
import { resolve } from "../../../dependencymanagement"
import SERVICE_IDENTIFIER from "../../../identifiers";
import { CreateCulturefyJobApplicationPayloadDTO } from '../../../Interface/payloadInterface/JobApplication';
import User from '../../../database/model/User';
import { BadRequestError } from "../../../core/ApiError";
import JobApplication from "./jobApplication.entity";
import { DatabaseId } from "../../../../types";




export class JobApplicationController {

  getJobApplicationService(): IJobApplicationService {
    return resolve<IJobApplicationService>(SERVICE_IDENTIFIER.JobApplicationService);
  }

  jobApplicationService = this.getJobApplicationService();

  add =
    asyncHandler(async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {

      const { business: { _id: businessId }, _id: createdBy } = req.user
      let bodyData: CreateCulturefyJobApplicationPayloadDTO = req.body
      let result = await this.jobApplicationService.add(bodyData, { createdBy, businessId })
      new SuccessResponse('Added successfully', result).send(res);
    }
    )

  getDropdownJobApplicantsByJobId =
    asyncHandler(async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      let jobId: DatabaseId = req.params.jobId
      const { business: { _id: businessId } } = req.user
      const applicantName: string = req.query.applicantName || '';
      let result = await this.jobApplicationService.getDropdownJobApplicantsByJobId(
        jobId as DatabaseId,
        businessId as DatabaseId,
        applicantName as string)
      new SuccessResponse('fetch successfully', result).send(res);
    }
    )

}
