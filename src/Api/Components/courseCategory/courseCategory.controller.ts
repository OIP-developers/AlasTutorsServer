import { Response, NextFunction } from "express"
import asyncHandler from "../../../helpers/async";
// import UserRepo from '../../../database/repository/UserRepo';
// import { generateTokenKey } from "../../../helpers/tokenKeyGenerator";
// import User from '../../../database/model/User';
// import { RoleCode } from '../../../database/model/Role';
import { SuccessResponse, SuccessMsgResponse } from '../../../core/ApiResponse';
import { NoDataError, BadRequestError } from '../../../core/ApiError';
import _ from 'lodash';
// import { createTokens } from '../../../utils/authUtils';
// import KeystoreRepo from '../../../database/repository/KeystoreRepo';
// import { comparePassword } from "../../../utils/password";
import courseCategoryRepo from './courseCategory.repository';

export class courseCategoryController {

  getAll = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const courses = await courseCategoryRepo.find();
      if (!courses) throw new NoDataError();
      // await ApiResponseTime(req)
      new SuccessResponse('fetch successfully', courses).send(res);
    }
  )

  // getWithSubCategory = asyncHandler(
  //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
  //     const { categories } = await courseCategoryRepo.findWithSubCategory()
  //     new SuccessResponse('update success', categories).send(res);
  //   }
  // )

  add = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { course } = await courseCategoryRepo.create(req.body);
      new SuccessResponse('Added successfully', course).send(res);
    }
  )

  delete = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { course } = await courseCategoryRepo.delete(req.params._id);
      new SuccessResponse('deleted successfully', course).send(res);
    }
  )

  update = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { course } = await courseCategoryRepo.updateCate(req.params._id, req.body)
      new SuccessResponse('update success', course).send(res);
    }
  )


}
