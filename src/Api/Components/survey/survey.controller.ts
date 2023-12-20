import { Response, NextFunction } from "express"
import asyncHandler from "../../../helpers/async";
import JWT from "../../../core/JWT";
import { SuccessResponse, SuccessMsgResponse } from '../../../core/ApiResponse';
import { createTokens, getAccessToken, validateTokenData } from '../../../utils/authUtils';
import { NoDataError, BadRequestError } from '../../../core/ApiError';
import _ from 'lodash';
import SurveyRepo from './survey.repository';
import userSurveyRepo from "../userSurvey/userSurvey.repository"


export class SurveyController {

  getAll = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      console.log("REQ USER", req.user)
      const businessId = req.user.business._id;
      const buckets = await SurveyRepo.find(businessId);
      if (!buckets) throw new NoDataError();
      // await ApiResponseTime(req)
      new SuccessResponse('fetch successfully', buckets).send(res);
    }
  )
  getUserSurvey = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      // console.log("REQ USER", req.user._id)
      // const businessId = req.user.business._id;
      const buckets = await SurveyRepo.findUserSurvey(req.user._id);
      if (!buckets) throw new NoDataError();
      // await ApiResponseTime(req)
      new SuccessResponse('fetch successfully', buckets).send(res);
    }
  )

  getUserSurveyById = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const buckets = await SurveyRepo.findUserSurveyById({ _id: req.params._id, user: req.user._id });
      if (!buckets) throw new NoDataError();
      new SuccessResponse('fetch successfully', buckets).send(res);
    }
  )

  getSurveyAnsById = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const buckets = await SurveyRepo.findBySurveyId(req.params._id);
      if (!buckets.length) throw new NoDataError();
      new SuccessResponse('fetch successfully', buckets[0]).send(res);  //// index is use to get object instead of array
    }
  )

  getRecords = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      // const businessId = req.user.business._id;
      const total = await SurveyRepo.findAll();
      const count = await SurveyRepo.surveyCount();
      // @ts-ignore
      const mean = (total[0].totalCompletion / count).toFixed(1);
      console.log("buckets count", mean)
      if (!total) throw new NoDataError();
      // await ApiResponseTime(req)
      new SuccessResponse('fetch successfully', mean).send(res);
    }
  )


  getById = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const buckets = await SurveyRepo.findById(req.params._id);
      if (!buckets) throw new NoDataError();
      // await ApiResponseTime(req)
      new SuccessResponse('fetch successfully', buckets).send(res);
    }
  )

  getByIdForReport = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const buckets = await SurveyRepo.findById(req.params._id);
      const ans = []
      // @ts-ignore
      for await (const element of buckets.assigned) {
        const result = await userSurveyRepo.findByUser(element)
        ans.push(result)
      }
      // @ts-ignore
      buckets.answers = ans
      
      if (!buckets) throw new NoDataError();
      // await ApiResponseTime(req)
      new SuccessResponse('fetch successfully', buckets).send(res);
    }
  )

  add = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      // @ts-ignore
      const { bucket } = await SurveyRepo.create({ survey: req.body.survey, business: req.user.business._id, assigned: req.body.assigned, name: req.body.name, description: req.body.description, completion: req.body.completion });

      for (const user of bucket.assigned) {
        await userSurveyRepo.create({
          survey: bucket.survey,
          survey_id: bucket._id,
          survey_answers: {},
          completion: 0,
          user: user,
          business: bucket.business
        })
      }

      new SuccessResponse('Added successfully', bucket).send(res);
    }
  )

  delete = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { bucket } = await SurveyRepo.delete(req.params._id);
      new SuccessResponse('deleted successfully', bucket).send(res);
    }
  )

  update = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { bucket } = await SurveyRepo.updateCate(req.params._id, req.body)
      new SuccessResponse('update success', bucket).send(res);
    }
  )

  updateUserSurvey = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { bucket } = await SurveyRepo.updateUserSurvey(req.params._id, req.body)
      new SuccessResponse('update success', bucket).send(res);
    }
  )

}
