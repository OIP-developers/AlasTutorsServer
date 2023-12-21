import { Response, NextFunction } from "express"
import asyncHandler from "../../../helpers/async";
import JWT from "../../../core/JWT";
import { SuccessResponse, SuccessMsgResponse } from '../../../core/ApiResponse';
import { createTokens, getAccessToken, validateTokenData } from '../../../utils/authUtils';
import { NoDataError, BadRequestError } from '../../../core/ApiError';
import _ from 'lodash';
import TaskRepo from './Task.repository';
import userSurveyRepo from "../userSurvey/userSurvey.repository"

export class TaskController {

  getAll = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      // const businessId = req.user.business._id;
      const task = await TaskRepo.find();
      if (!task) throw new NoDataError();
      // await ApiResponseTime(req)
      new SuccessResponse('fetch successfully', task).send(res);
    }
  )

  getById = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const task = await TaskRepo.findById(req.params._id);
      if (!task) throw new NoDataError();
      // await ApiResponseTime(req)
      new SuccessResponse('fetch successfully', task).send(res);
    }
  )

  assignTask = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const body = req.body
      body.user.map(async (ele: string) => {
        console.log("user: ", ele, "task: ", body.task)
        const { task } = await TaskRepo.taskAssignToUser({ ...body, user: ele });
        new SuccessResponse('Task create successfully', { task }).send(res);
      })
      // return
      // const { task } = await TaskRepo.taskAssignToUser(req.body);
      // new SuccessResponse('Task create successfully', { task }).send(res);
    }
  )

  add = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { task } = await TaskRepo.create(req.body);
      new SuccessResponse('Task create successfully', { task }).send(res);
    }
  )

  // add = asyncHandler(
  //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
  //     const { bucket } = await TaskRepo.create({ task: req.body.task, business: req.user.business._id, assigned: req.body.assigned });

  //     for (const user of bucket.assigned) {
  //       await userSurveyRepo.create({
  //         task: bucket.task,
  //         survey_id: bucket._id,
  //         survey_answers: {},
  //         completion: 0,
  //         user: user,
  //         business: bucket.business
  //       })
  //     }

  //     new SuccessResponse('Added successfully', bucket).send(res);
  //   }
  // )

  delete = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { task } = await TaskRepo.delete(req.params._id);
      new SuccessResponse('deleted successfully', task).send(res);
    }
  )

  update = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { task } = await TaskRepo.updateCate(req.params._id, req.body)
      new SuccessResponse('update success', task).send(res);
    }
  )

}
