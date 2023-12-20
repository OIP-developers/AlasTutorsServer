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

  removeComment = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { data } = await Repository.delete(req.params._id, req.body.commentId);
      new SuccessResponse('deleted successfully', { entity: data }).send(res);
    }
  )
  removeReply = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { data } = await Repository.removeReply(req.params._id, req.body.commentId, req.body.replyId);
      new SuccessResponse('deleted successfully', { entity: data }).send(res);
    }
  )
  removeLike = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { data } = await Repository.removeLike(req.params._id, req.body.commentId, req.body.likeId);
      new SuccessResponse('deleted successfully', { entity: data }).send(res);
    }
  )

  addComment = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      // console.log("REQ USER",req.user)
      req.body.commentBy = req.user._id
      const { data } = await Repository.update(req.params._id, req.body)
      new SuccessResponse('update success', { entity: data }).send(res);
    }
  )
  updateAnnotation = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => { 
      const { data } = await Repository.updateAnnotation(req.params._id, req.body)
      new SuccessResponse('update success', { entity: data }).send(res);
    }
  )
  addReply = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      // console.log("REQ USER",req.user)
      const commentId = req.body.commentId
      delete req.body.commentId
      req.body.answerBy = req.user._id
      console.log(req.body)
      const { data } = await Repository.addReply(req.params._id, commentId, req.body)
      new SuccessResponse('update success', { entity: data }).send(res);
    }
  )
  addLike = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      // console.log("REQ USER",req.user)
      const commentId = req.body.commentId
      delete req.body.commentId
      req.body.likeBy = req.user._id
      console.log(req.body)
      const { data } = await Repository.addLike(req.params._id, commentId, req.body)
      new SuccessResponse('update success', { entity: data }).send(res);
    }
  )

  updateCount = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      // const { data } = await Repository.updateCount(req.params._id, req.body.answer)
      // new SuccessResponse('update success', { entity: data }).send(res);
    }
  )

}
