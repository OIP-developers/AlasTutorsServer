import { Response, NextFunction } from "express"
import asyncHandler from "../../../helpers/async";
import { SuccessResponse, SuccessMsgResponse } from '../../../core/ApiResponse';
import { BadRequestError } from '../../../core/ApiError';
import { NoDataError } from '../../../core/ApiError';
import _ from 'lodash';
import UserCourse from './UserCourse'
import { UserCourseRepo } from './course.repository';

export class UserCourseController {

  getAll = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const user_course = await UserCourseRepo.findAll();
      new SuccessResponse('fetch successfully', { user_course }).send(res);
    }
  )

  add = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { user_course } = await UserCourseRepo.create(req.body);
      new SuccessResponse('Added successfully', { user_course }).send(res);
    }
  )

  startCourse = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { user_course } = await UserCourseRepo.create({
        user: req.user._id,
        course: req.params.course,
        percentage: 0,
      } as UserCourse);
      new SuccessResponse('Added successfully', { user_course }).send(res);
    }
  )

  delete = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { user_course } = await UserCourseRepo.delete(req.params._id);
      new SuccessResponse('deleted successfully', { user_course }).send(res);
    }
  )

  update = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { user_course } = await UserCourseRepo.update(req.params._id, req.body)
      new SuccessResponse('update success', { user_course }).send(res);
    }
  )


}
