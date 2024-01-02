import { Response, NextFunction } from "express"
import asyncHandler from "../../../helpers/async";
import { SuccessResponse, SuccessMsgResponse, BadRequestResponse } from '../../../core/ApiResponse';
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
      const { data } = await Repository.create(req.body);
      new SuccessResponse('Referral created successfully', { entity: data }).send(res);
    }
  )

  varifyStatus = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const result = await Repository.findOne({ userId: req.user._id });
      if (result.isUsed = false)
        new SuccessResponse('', { entity: result }).send(res);
      else {
        throw new BadRequestResponse("Sorry this referral is already used")
      }
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
