import { Response, NextFunction } from "express"
import asyncHandler from "../../../helpers/async";
import JWT from "../../../core/JWT";
import { SuccessResponse, SuccessMsgResponse } from '../../../core/ApiResponse';
import { createTokens, getAccessToken, validateTokenData } from '../../../utils/authUtils';
import { NoDataError, BadRequestError } from '../../../core/ApiError';
import _ from 'lodash';
import RecommendationRepo from './Recommendation.repository';
import { Repository } from '../possesCards/repository'
import userSurveyRepo from "../userSurvey/userSurvey.repository"
import { Modal as BCSAnswersModal } from '../BCSanswers/Modal'
import { RoleCode } from "../../../database/model/Role";

export class RecommendationController {

  getAll = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      // const businessId = req.user.business._id;
      let query = {}

      if (req.query.role) {
        query = {
          role: req.query.role
        }
      }

      const task = await RecommendationRepo.find(query);
      if (!task) throw new NoDataError();
      // await ApiResponseTime(req)
      new SuccessResponse('fetch successfully', task).send(res);
    }
  )

  getById = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const task = await RecommendationRepo.findById(req.params._id);
      if (!task) throw new NoDataError();
      // await ApiResponseTime(req)
      new SuccessResponse('fetch successfully', task).send(res);
    }
  )

  findWithGoal = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const user = req.user;

      let query: { role: any, goals?: any, function?: any } = {
        role: user.role.code
      }

      if (req.query.goal) {
        query = {
          ...query,
          goals: req.query.goal
        }
      }

      const survey_answer = await BCSAnswersModal.findOne({ user: user._id, question: '63778e9460eedc2b4ed6b021' });
      const survey_answer_by_name = await BCSAnswersModal.findOne({ user: user._id, question: '63778f496aca3f60772d8abb' });
      const survey_answers_work_goals = await BCSAnswersModal.findOne({ user: user._id, question: '63d92a2205248e8c26a870e6' });

      const possesCardId = await Repository.findByIds(survey_answer_by_name?.answer);
      const titles = possesCardId.map(item => item.function.toUpperCase().split(' ').join('_'))

      //Check if user has selected any function or not 
      if (titles.length) {
        query = {
          ...query,
          function: { $in: titles }
        }
      }

      // Check if position goals exists
      if (survey_answer?.answer?.length) {
        query = {
          ...query,
          goals: { $in: survey_answer?.answer }
        }
      }

      // Check if work goals exists
      if (survey_answers_work_goals?.answer?.length) {
        query = {
          ...query,
          goals: { $in: survey_answers_work_goals?.answer }
        }
      }

      // @ts-ignore
      const goalId = await RecommendationRepo.findByGoal(query);
      if (!goalId) throw new NoDataError();
      new SuccessResponse('fetch successfully', goalId).send(res);
    }
  )
  // findWithWork = asyncHandler(
  //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
  //     const user = req.user;
  //     const survey_answer = await BCSAnswersModal.findOne({ user: user._id, question: '63d92a2205248e8c26a870e6' });
  //     // const possesCardId = await Repository.findByIds(survey_answer_by_name?.answer);
  //     const titles = possesCardId.map(item => item.function.toUpperCase().split(' ').join('_'))
  //     console.log(titles)
  //     // @ts-ignore
  //     const goalId = await RecommendationRepo.findByGoal(survey_answer.answer, titles, query);
  //     if (!goalId) throw new NoDataError();
  //     new SuccessResponse('fetch successfully', goalId).send(res);
  //   }
  // )

  add = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { task } = await RecommendationRepo.create(req.body);
      new SuccessResponse('Recommendation created successfully', { task }).send(res);
    }
  )

  // add = asyncHandler(
  //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
  //     const { bucket } = await RecommendationRepo.create({ task: req.body.task, business: req.user.business._id, assigned: req.body.assigned });

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
      const { task } = await RecommendationRepo.delete(req.params._id);
      new SuccessResponse('deleted successfully', task).send(res);
    }
  )

  update = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { task } = await RecommendationRepo.updateCate(req.params._id, req.body)
      new SuccessResponse('update success', task).send(res);
    }
  )

}
