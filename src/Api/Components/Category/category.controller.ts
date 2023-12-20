import { Response, NextFunction } from "express"
import asyncHandler from "../../../helpers/async";
import { SuccessResponse, SuccessMsgResponse } from '../../../core/ApiResponse';
import { BadRequestError } from '../../../core/ApiError';
import { NoDataError } from '../../../core/ApiError';
import _ from 'lodash';
import CategoryRepo from './category.repository';
import { RoleCode } from "../../../database/model/Role";

export class CategoryController {

  getAll = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      console.log(req.user);

      const categorys = await CategoryRepo.findWithDetails(req.user._id);

      // console.log(categorys , "categoryscategoryscategoryscategorys")

      const categoriesByRole = categorys.filter(cat => req.user.role.code === RoleCode.ADMIN ? cat.role === RoleCode.ADMIN : cat.role ===  RoleCode.USER)

      const modified = categoriesByRole.map((category) => {
        if (!category.subCategories) throw new BadRequestError("Sub categories not exist");
        return {
          ...category,
          subCategories: category.subCategories.map((subs) => {
            if (!subs.questions) throw new BadRequestError("Sub categories questions not exist");
            // if (!subs.questions || !subs.questions[0].answers) throw new BadRequestError("answers not exist");
            return {
              ...subs,
              questions: {
                ...subs.questions[0],
                answers: (subs.questions[0] && subs.questions[0].answers && subs.questions[0].answers.length) ? subs.questions[0].answers[0] : {},
              }
            }
          })
        }
      })
      if (!categorys) throw new NoDataError();
      new SuccessResponse('fetch successfully', modified).send(res);
    }
  )

  getByUser = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      // console.log(req.user);

      const categorys = await CategoryRepo.findWithDetails(req.query.userId);

      const modified = categorys.map((category) => {
        if (!category.subCategories) throw new BadRequestError("Sub categories not exist");
        return {
          ...category,
          subCategories: category.subCategories.map((subs) => {
            if (!subs.questions) throw new BadRequestError("Sub categories questions not exist");
            // if (!subs.questions || !subs.questions[0].answers) throw new BadRequestError("answers not exist");
            return {
              ...subs,
              questions: {
                ...subs.questions[0],
                answers: (subs.questions[0] && subs.questions[0].answers && subs.questions[0].answers.length) ? subs.questions[0].answers[0] : {},
              }
            }
          })
        }
      })
      if (!categorys) throw new NoDataError();
      new SuccessResponse('fetch successfully', modified).send(res);
    }
  )

  getWithSubCategory = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { categories } = await CategoryRepo.findWithSubCategory()
      new SuccessResponse('update success', categories).send(res);
    }
  )

  add = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { category } = await CategoryRepo.create(req.body);
      new SuccessResponse('Added successfully', category).send(res);
    }
  )

  delete = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { category } = await CategoryRepo.delete(req.params._id);
      new SuccessResponse('deleted successfully', category).send(res);
    }
  )

  update = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { category } = await CategoryRepo.updateCate(req.params._id, req.body)
      new SuccessResponse('update success', category).send(res);
    }
  )


}
