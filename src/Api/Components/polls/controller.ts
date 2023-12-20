import { Response, NextFunction } from "express"
import asyncHandler from "../../../helpers/async";
import { SuccessResponse, SuccessMsgResponse } from '../../../core/ApiResponse';
import { NoDataError, BadRequestError } from '../../../core/ApiError';
import _ from 'lodash';
import { Repository } from './repository';

export class Controller {

  getAll = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const data = await Repository.find();
      if (!data) throw new NoDataError();
      new SuccessResponse('fetch successfully', { entities: data }).send(res);
    }
  )

  getById = asyncHandler(
    async (req: any, res: any, next: NextFunction): Promise<Response | void> => {
      const data = await Repository.findById(req.params._id);
      if (!data) throw new NoDataError();
      new SuccessResponse('Fetch successfully', { entities: data }).send(res);
    }
  )

  add = asyncHandler(
    // console.log("HEllo")
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { data } = await Repository.create(req.body);
      new SuccessResponse('Added successfully', { entity: data }).send(res);
    }
  )

  delete = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { data } = await Repository.delete(req.params._id);
      new SuccessResponse('deleted successfully', { entity: data }).send(res);
    }
  )

  update = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { data } = await Repository.update(req.params._id, req.body)
      new SuccessResponse('update success', { entity: data }).send(res);
    }
  )
  updateCount = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      req.body.answerBy = req.user._id
      const { data } = await Repository.updateCount(req.params._id, req.body.answer, req.body.answerBy)
      new SuccessResponse('update success', { entity: data }).send(res);
    }
  )
}
