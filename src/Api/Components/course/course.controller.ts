import { Response, Request, NextFunction } from "express";
import { ProtectedRequest } from "../../../types/app-request";
import asyncHandler from "../../../helpers/async";
// import CategoryRepo from './category.repository';
import { BadRequestError, NoDataError } from '../../../core/ApiError';
import { SuccessResponse } from '../../../core/ApiResponse';
import Course, { CourseModel } from './Course'
import { Prisma } from "@prisma/client";
import { Repository } from '../common/repository'
import CourseRepo from "./course.repository";

export class CourseController {



  // getAll = asyncHandler(
  //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
  //     const { query } = req

  //     const { entities, pagination } = await Repository.findMany<
  //       Prisma.CategoryWhereInput,
  //       Prisma.CategoryDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>,
  //       Prisma.CategorySelect,
  //       Prisma.CategoryInclude
  //     >({
  //       Model: CategoryModel,
  //       where: {},
  //       search: query.search,
  //       limit: query.limit,
  //       page: query.page,
  //       fullTextSearch: ['name', 'title']
  //     });
  //     new SuccessResponse('fetch success', { entities, pagination }).send(res);

  //   }
  // )

  // getById = asyncHandler(
  //   async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  //     const entity = await CategoryRepo.findById({ where: { id: req.params.id } });
  //     if (!entity) throw new NoDataError();
  //     new SuccessResponse('fetch success', { entity }).send(res);
  //   }
  // )

  // create = asyncHandler(
  //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
  //     const { body } = req;
  //     console.log("course",body)
  //     // body.name = body.name.toLowerCase();
  //     // if (!body.slug) {
  //     //   body.slug = body.name.slice(0, 2) + "-" + Math.floor((Math.random() * 10000) + 1);
  //     // }

   

  //     const category = await CourseRepo.create({course:body});
  //     new SuccessResponse('create success', { category }).send(res);
  //   }
  // )

  getAll = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const user = req.user;

      const course = await CourseRepo.find();

      new SuccessResponse('fetch success', { course}).send(res);

    }
  )

  create = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { body } = req;
      console.log("course",body)
      // body.name = body.name.toLowerCase();
      // if (!body.slug) {
      //   body.slug = body.name.slice(0, 2) + "-" + Math.floor((Math.random() * 10000) + 1);
      // }

   

      const category = await CourseRepo.create(body);
      new SuccessResponse('create success', { category }).send(res);
    }
  )

  // statusUpdate = asyncHandler(
  //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
  //     const { body, params } = req;

   

  //     const category = await CategoryRepo.statusUpdate({ id: params.id, status: body });
  //     new SuccessResponse('status updated success', { category }).send(res);
  //   }
  // )

  update = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      const { body, params } = req;
      // body.name = body.name.toLowerCase();
      const course= await CourseRepo.update(params.id,body)
      new SuccessResponse('update success', { course }).send(res);
    }
  )

  delete = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      const { params } = req;
      const category = await CourseRepo.delete(params.id);
      new SuccessResponse('delete success', { category }).send(res);
    }
  )
  getById = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const {user,parms} = req;

      const course = await CourseRepo.findById(req.params.id);

      new SuccessResponse('fetch success', { course }).send(res);

    }
  )
}
