import { Response, NextFunction } from "express"
import asyncHandler from "../../../helpers/async";
import { SuccessResponse, SuccessMsgResponse } from '../../../core/ApiResponse';
import { NoDataError, BadRequestError } from '../../../core/ApiError';
import _ from 'lodash';
import QuestionRepo from './question.repository';
import { QUESTION_TYPE } from '../StrategyQuestions/Question'
import { Repository as AnswerRepo } from '../BCSanswers/repository'
import { Repository as PossesRepo } from '../possesCards/repository'
import { Repository as PostionGoalRepo } from '../PostionGoal/repository'

import { Repository as BrandAuditRepo } from '../brandAudit/repository'

export class QuestionController {

    getAll = asyncHandler(
        async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
            const questionDatas = await QuestionRepo.find(req.params.subcategory);
            if (!questionDatas) throw new NoDataError();
            // await ApiResponseTime(req)
            new SuccessResponse('fetch successfully', questionDatas).send(res);
        }
    )

    add = asyncHandler(
        async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
            // const userId = req.user._id;
            // let userData: any = { answer: req.body.answer, question: req.body.question, user: userId }
            let answer: any = {}
            const { questionData } = await QuestionRepo.create(req.body);
            if (questionData.type === QUESTION_TYPE.TEXT) {
                answer = ""
            }
            else if (questionData.type === QUESTION_TYPE.BRAND_AUDIT) {
                answer = await BrandAuditRepo.find()
            }
            else if (questionData.type === QUESTION_TYPE.POSSES_CARDS) {
                answer = [] // await PossesRepo.find()
            } else if (questionData.type === QUESTION_TYPE.POSITION_GOALS) {
                answer = [] //await PostionGoalRepo.find()
            }

            const createdAnswer = await AnswerRepo.create({
                question: questionData._id,
                answer,
                user: req.user._id
            })
            new SuccessResponse('Added successfully', { question: questionData, answer: createdAnswer.data }).send(res);
        }
    )

    delete = asyncHandler(
        async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
            const { questionData } = await QuestionRepo.delete(req.params._id);
            new SuccessResponse('deleted successfully', questionData).send(res);
        }
    )

    update = asyncHandler(
        async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
            const { questionData } = await QuestionRepo.updateCate(req.params._id, req.body)
            new SuccessResponse('update success', questionData).send(res);
        }
    )

}
