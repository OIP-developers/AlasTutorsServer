import { Response, NextFunction } from "express"
import asyncHandler from "../../../helpers/async";
import JWT from "../../../core/JWT";
import { SuccessResponse, SuccessMsgResponse } from '../../../core/ApiResponse';
import { createTokens, getAccessToken, validateTokenData } from '../../../utils/authUtils';
import { NoDataError, BadRequestError } from '../../../core/ApiError';
import _ from 'lodash';
import TaskRepo from './Task.repository';
import userSurveyRepo from "../userSurvey/userSurvey.repository"
import { Repository as PostionGoalsRepo } from "../PostionGoal/repository"
import { TaskService } from "./task.service"

export class TaskController {

  readonly service: TaskService = new TaskService()

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
        const { task } = await TaskRepo.taskAssignToUser({ ...body, user: ele });
        new SuccessResponse('Task create successfully', { task }).send(res);
      })
    }
  )

  add = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { task } = await TaskRepo.create({ ...req.body });
      new SuccessResponse('Task create successfully', { task }).send(res);
    }
  )

  addTaskByRecommendation = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {

      const positionGoal = await PostionGoalsRepo.findById(req.body.goal)

      if (!positionGoal) throw new NoDataError();

      const { task: goalTask } = await TaskRepo.createGoalTask({
        title: positionGoal.title,
        description: positionGoal.description,
        department: req.body.department_id,
        goal: positionGoal._id,
        dueDate: "23-11-2001",
        percentage: 0,
        business: req.user.business._id
      })

      const { task } = await TaskRepo.create({ ...req.body, goalTask: goalTask._id, title: goalTask.title, description: goalTask.description });

      new SuccessResponse('Task create successfully', { task }).send(res);
    }
  )

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

  // Goal Tasks

  getGoalTasksByBusiness = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      // const businessId = req.user.business._id;
      const query = { business: req.user.business._id }
      const task = await TaskRepo.getGoalTasks(query);
      if (!task) throw new NoDataError();
      // await ApiResponseTime(req)
      new SuccessResponse('fetch successfully', task).send(res);
    }
  )

  addGoalTask = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {

      const tasks = req.body.tasks
      delete req.body.tasks
      const { task: goalTask } = await TaskRepo.createGoalTask({ ...req.body, business: req.user.business._id });

      if (!goalTask) throw new NoDataError();

      const tasksCreated = await this.service.createTasks(tasks, goalTask._id)

      if (!tasksCreated) throw new NoDataError();

      new SuccessResponse('fetch successfully', goalTask).send(res);
    }
  )

  getSingleGoalWithTasks = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {

      const goalTask = await TaskRepo.findWithTasks(req.params._id);

      new SuccessResponse('fetch successfully', goalTask).send(res);
    }
  )

}
