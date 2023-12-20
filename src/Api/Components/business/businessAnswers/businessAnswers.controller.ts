import { Response, NextFunction } from "express"
import asyncHandler from "../../../../helpers/async";
// import UserRepo from '../../../database/repository/UserRepo';
// import { generateTokenKey } from "../../../helpers/tokenKeyGenerator";
// import User from '../../../database/model/User';
// import { RoleCode } from '../../../database/model/Role';
import { SuccessResponse, SuccessMsgResponse, InternalErrorResponse } from '../../../../core/ApiResponse';
import { NoDataError, BadRequestError } from '../../../../core/ApiError';
import _ from 'lodash';
// import { createTokens } from '../../../utils/authUtils';
// import KeystoreRepo from '../../../database/repository/KeystoreRepo';
// import { comparePassword } from "../../../utils/password";
import Business from "./businessAnswers.repository";
import UserRepo from "../../../../database/repository/UserRepo";
import IUserRepository from '../../../../database/repository/iuser.repository';
import SERVICE_IDENTIFIER from '../../../../identifiers';
import { resolve } from '../../../../dependencymanagement';

export class BusinessController {

  
  getUserRepository(): IUserRepository {
    return resolve<IUserRepository>(SERVICE_IDENTIFIER.UserRepository);
  }
  userRepository = this.getUserRepository();



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
      const settingDatas = await Business.findByBusinessId(req.params._id);
      if (!settingDatas) throw new NoDataError();
      // await ApiResponseTime(req)
      new SuccessResponse('fetch successfully', settingDatas).send(res);
    }
  )

  add = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { settingData } = await Business.create(req.body);
      if (!settingData) throw new InternalErrorResponse("Something Went Wrong")
      const updateUser = await this.userRepository.updateInfo(req.user._id, { ...req.user, businessQuestionsAnswered: true })
      if (!updateUser) throw new InternalErrorResponse("Something Went Wrong")
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
