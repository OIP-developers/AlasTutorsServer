import { Response, Request, NextFunction } from "express";
import { ProtectedRequest } from "../../../types/app-request";
import asyncHandler from "../../../helpers/async";
import CategoryRepo from './category.repository';
import { BadRequestError, NoDataError } from '../../../core/ApiError';
import { SuccessResponse } from '../../../core/ApiResponse';
import Category, { CategoryModel } from './Category'
import { Prisma } from "@prisma/client";
import { Repository } from '../common/repository'

export class CategoryController {

  // getAll = asyncHandler(
  //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
  //     const categories = await CategoryRepo.find({ where: {} });
  //     if (categories.length === 0) throw new NoDataError();
  //     new SuccessResponse('fetch success', { categories }).send(res);

  //   }
  // )

  getAll = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { query } = req

      const { entities, pagination } = await Repository.findMany<
        Prisma.CategoryWhereInput,
        Prisma.CategoryDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>,
        Prisma.CategorySelect,
        Prisma.CategoryInclude
      >({
        Model: CategoryModel,
        where: {},
        search: query.search,
        limit: query.limit,
        page: query.page,
        fullTextSearch: ['name', 'title']
      });
      new SuccessResponse('fetch success', { entities, pagination }).send(res);

    }
  )

  getById = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      const entity = await CategoryRepo.findById({ where: { id: req.params.id } });
      if (!entity) throw new NoDataError();
      new SuccessResponse('fetch success', { entity }).send(res);
    }
  )

  create = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { body } = req;
      body.name = body.name.toLowerCase();
      if (!body.slug) {
        body.slug = body.name.slice(0, 2) + "-" + Math.floor((Math.random() * 10000) + 1);
      }

      // const isExist = await CategoryRepo.findOne({ name: body.name } as Category)
      // if (isExist) throw new BadRequestError("this category type already exist!")

      const category = await CategoryRepo.create({ category: body });
      new SuccessResponse('create success', { category }).send(res);
    }
  )

  statusUpdate = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { body, params } = req;

      // const isExist = await CategoryRepo.findOne({ name: body.name } as Category)
      // if (isExist) throw new BadRequestError("this category type already exist!")

      const category = await CategoryRepo.statusUpdate({ id: params.id, status: body });
      new SuccessResponse('status updated success', { category }).send(res);
    }
  )

  update = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      const { body, params } = req;
      body.name = body.name.toLowerCase();
      const category = await CategoryRepo.update({ id: params.id, category: body });
      new SuccessResponse('update success', { category }).send(res);
    }
  )

  delete = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      const { params } = req;
      const category = await CategoryRepo.delete(params.id);
      new SuccessResponse('delete success', { category }).send(res);
    }
  )

}
