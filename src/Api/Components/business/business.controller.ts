import { Response, NextFunction } from "express"
import asyncHandler from "../../../helpers/async";
// import UserRepo from '../../../database/repository/UserRepo';
// import { generateTokenKey } from "../../../helpers/tokenKeyGenerator";
// import User from '../../../database/model/User';
// import { RoleCode } from '../../../database/model/Role';
import { SuccessResponse, SuccessMsgResponse, InternalErrorResponse } from '../../../core/ApiResponse';
import { NoDataError, BadRequestError } from '../../../core/ApiError';
import _ from 'lodash';
// import { createTokens } from '../../../utils/authUtils';
// import KeystoreRepo from '../../../database/repository/KeystoreRepo';
// import { comparePassword } from "../../../utils/password";
import Business from "./business.repository";
import BusinessQuestionsRepo from "./businessQuestions/businessQuestions.repository";
import { defaultJson } from "../../../constants/surveybuilder";

export class BusinessController {

  getAll = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const settingDatas = await Business.find();
      if (!settingDatas) throw new NoDataError();
      // await ApiResponseTime(req)
      new SuccessResponse('fetch successfully', settingDatas).send(res);
    }
  )

  getById = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const settingDatas = await Business.findById(req.params._id);
      if (!settingDatas) throw new NoDataError();
      // await ApiResponseTime(req)
      new SuccessResponse('fetch successfully', settingDatas).send(res);
    }
  )

  add = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { settingData } = await Business.create(req.body);
      if (!settingData) throw new InternalErrorResponse("Something Went Wrong")
      const createBusinessQuestion = await BusinessQuestionsRepo.create({ business: settingData._id, question: JSON.stringify(defaultJson) })
      if (!createBusinessQuestion) throw new InternalErrorResponse("Something Went Wrong")
      new SuccessResponse('Added successfully', settingData).send(res);
    }
  )

  delete = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { settingData } = await Business.delete(req.params._id);
      new SuccessResponse('deleted successfully', settingData).send(res);
    }
  )

  update = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { settingData } = await Business.updateBusiness(req.params._id, req.body)
      new SuccessResponse('update success', settingData).send(res);
    }
  )

}
