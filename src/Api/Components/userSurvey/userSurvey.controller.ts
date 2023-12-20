import { Response, NextFunction } from "express"
import asyncHandler from "../../../helpers/async";
import JWT from "../../../core/JWT";
import { SuccessResponse, SuccessMsgResponse } from '../../../core/ApiResponse';
import { createTokens, getAccessToken, validateTokenData } from '../../../utils/authUtils';
import { NoDataError, BadRequestError } from '../../../core/ApiError';
import _ from 'lodash';
import SurveyRepo from './userSurvey.repository';

export class SurveyController {

  getAll = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const businessId = req.user.business._id;
      const buckets = await SurveyRepo.find(businessId);
      if (!buckets) throw new NoDataError();
      // await ApiResponseTime(req)
      new SuccessResponse('fetch successfully', buckets).send(res);
    }
  )

  getById = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const buckets = await SurveyRepo.findById(req.params._id);
      if (!buckets) throw new NoDataError();
      // await ApiResponseTime(req)
      new SuccessResponse('fetch successfully', buckets).send(res);
    }
  )

  add = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { bucket } = await SurveyRepo.create(req.body);
      new SuccessResponse('Added successfully', bucket).send(res);
    }
  )

  delete = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { bucket } = await SurveyRepo.delete(req.params._id);
      new SuccessResponse('deleted successfully', bucket).send(res);
    }
  )

  update = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { bucket } = await SurveyRepo.updateCate(req.params._id, req.body)
      new SuccessResponse('update success', bucket).send(res);
    }
  )

}
