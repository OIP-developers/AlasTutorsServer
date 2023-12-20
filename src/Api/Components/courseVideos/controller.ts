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
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const findCourse = await Repository.findByCourse(req.body.courseId)
      const index = findCourse[0].index + 1
      // const videoIndex = req.body.index
      const { data } = await Repository.create({ ...req.body, index });
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

  //Expression
  addExpression = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {

      const user = req.user

      const expressionExists = await Repository.findOneExpression({ video: req.body.video, user: user._id })

      if (!expressionExists) {
        const { data } = await Repository.createExpression({ ...req.body, user: user._id })
        return new SuccessResponse('Expression Added Successfully', { entity: data }).send(res);
      }

      if (expressionExists && expressionExists.expression !== req.body.expression) {
        const { data } = await Repository.updateExpression(expressionExists._id, { ...req.body, user: user._id })
        return new SuccessResponse('Expression Updated Successfully', { entity: data }).send(res);
      }

      const { data } = await Repository.deleteExpression(expressionExists._id)
      new SuccessResponse('Expression Removed Successfully', { entity: data }).send(res);
    }
  )

  //View
  addView = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {

      const user = req.user

      const createView = await Repository.createView({ ...req.body, user: user._id })
      return new SuccessResponse('View Added Successfully', { entity: createView }).send(res);

    }
  )

  //Question
  addQuestion = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {

      const user = req.user

      const createQuestion = await Repository.createQuestion({ ...req.body, user: user._id })
      return new SuccessResponse('Question Added Successfully', { entity: createQuestion }).send(res);

    }
  )

  //Answer
  addAnswer = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {

      const user = req.user

      const createQuestion = await Repository.createAnswer({ ...req.body, user: user._id })
      return new SuccessResponse('Question Added Successfully', { entity: createQuestion }).send(res);

    }
  )

  //Notes
  addNote = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {

      const user = req.user

      const createNote = await Repository.createNote({ ...req.body, user: user._id })
      return new SuccessResponse('Note Added Successfully', { entity: createNote }).send(res);

    }
  )

}
