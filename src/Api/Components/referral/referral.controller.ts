import { Response, NextFunction } from "express"
import asyncHandler from "../../../helpers/async";
import { SuccessResponse, SuccessMsgResponse, BadRequestResponse, ForbiddenResponse } from '../../../core/ApiResponse';
import { NoDataError, BadRequestError } from '../../../core/ApiError';
import _ from 'lodash';
import { Repository } from './referral.repository';

export class Controller {

  // getAll = asyncHandler(
  //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
  //     const data = await Repository.find();
  //     if (!data) throw new NoDataError();
  //     new SuccessResponse('fetch successfully', { entities: data }).send(res);
  //   }
  // )

  // getById = asyncHandler(
  //   async (req: any, res: any, next: NextFunction): Promise<Response | void> => {
  //     // const data = await Repository.findById(req.params._id);
  //     // if (!data) throw new NoDataError();
  //     new SuccessResponse('Fetch successfully', { entities: {} }).send(res);
  //   }
  // )

  createReferral = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const result = await Repository.findOne({ userId: req.user._id });
      console.log(result, "resultsssss")
      if (result) return new SuccessResponse('referral link already generated for this user', { entity: result, success: true }).send(res);
      const { data } = await Repository.create({ ...req.body, userId: req.user._id, isUsed: false });
      new SuccessResponse('Referral created successfully', { entity: data }).send(res);
    }
  )

  verifyStatus = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      let query = {}

      if (req.body.userId) {
        query = { userId: req.body.userId }
      } else {
        query = { code: req.body.code }
      }

      const result = await Repository.findOne({ ...query });
      if (result && !result.isUsed) return new SuccessResponse('Referral link valid', { entity: result, success: true }).send(res);
      return new SuccessResponse('Referral link already used', { entity: result, success: false }).send(res);
    }
  )

  //   delete = asyncHandler(
  //     async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
  //       const { data } = await Repository.delete(req.params._id);
  //       new SuccessResponse('deleted successfully', { entity: data }).send(res);
  //     }
  //   )

  //   update = asyncHandler(
  //     async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
  //       const { data } = await Repository.update(req.params._id, req.body)
  //       new SuccessResponse('update success', { entity: data }).send(res);
  //     }
  //   )

}
