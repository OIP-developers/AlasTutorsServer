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

  addReply = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      req.body.replyBy = req.user._id
      console.log(req.body)
      const { data } = await Repository.addReply(req.params._id, req.body)
      new SuccessResponse('update success', { entity: data }).send(res);
    }
  )

  addLike = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      // console.log("REQ USER",req.user)
      const replyId = req.body.replyId
      delete req.body.replyId
      req.body.likeBy = req.user._id
      const { data } = await Repository.addLike(req.params._id, replyId, req.body)
      new SuccessResponse('update success', { entity: data }).send(res);
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
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      req.body.user = req.user._id
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

}
  