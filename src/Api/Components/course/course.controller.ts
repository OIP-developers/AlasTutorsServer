import { Response, Request, NextFunction } from "express";
import { ProtectedRequest } from "../../../types/app-request";
import asyncHandler from "../../../helpers/async";
// import CategoryRepo from './category.repository';
import { BadRequestError, NoDataError } from '../../../core/ApiError';
import { SuccessResponse } from '../../../core/ApiResponse';
import Course, { CourseModel } from './Course'
import Video, { VideoModel } from './video/video'
import { Prisma, User } from "@prisma/client";
import { Repository } from '../common/repository'
import CourseRepo from "./course.repository";
import VideoRepo from "./video/video.repository";

import courseReviewRepo from "./review/courseReview.repository";
import { ViewRepository } from './view/view.repository'


export class CourseController {

  private ViewRepository: ViewRepository = new ViewRepository()

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
      const user = req.user as User;

      const courses = await CourseRepo.find({
        where: {},
        include: {
          orderItems: {
            where: {
              order: {
                userId: user.id,
                // invoice: {
                //   status: 'paid'
                // }
              }
            }
          },
          Cart: {
            where: {
              userId: user.id
            }
          },
          createdBy: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              email: true,
              profile_picture: true,
            }
          }
        }
      });

      new SuccessResponse('fetch success', { courses }).send(res);

    }
  )

  getPublicCourses = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {

      const courses = await CourseRepo.find({
        where: {},
        include: {
          tags: true,
          banner: true,
          category: true,
          reviews: true,
          thumbnail: true,
          videos: true,
          createdBy: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              email: true,
              profile_picture: true,
            }
          }
        }
      });

      new SuccessResponse('fetch success', { courses }).send(res);

    }
  )

  create = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { body, user } = req;
      console.log("course", body)
      // body.name = body.name.toLowerCase();
      // if (!body.slug) {
      //   body.slug = body.name.slice(0, 2) + "-" + Math.floor((Math.random() * 10000) + 1);
      // }


      body.createdById = user.id
      const course = await CourseRepo.create(body);
      new SuccessResponse('create success', { course }).send(res);
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
      console.log("body", body)
      // body.name = body.name.toLowerCase();
      const course = await CourseRepo.update(params.id, body)
      console.log("body", body)
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
      const { user, parms } = req;

      const course = await CourseRepo.findById(req.params.id);
      //@ts-ignore
      const Cart = course.Cart.find((subs) => subs.userId === req.user.id)
      // console.log("isCart",isCart)
      //   console.log("isSubscribed",isSubscribed);

      // //   return {
      // //     isSubscribed: isSubscribed ? true : false,
      // //     ...channel
      // //   }
      // // })
      //@ts-ignore
      course.isCart = Cart ? true : false

      new SuccessResponse('fetch success', { course }).send(res);

    }
  )
  getByPublicId = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { user, parms } = req;

      const course = await CourseRepo.findById(req.params.id);
      // //@ts-ignore
      // const Cart = course.Cart.find((subs) => subs.userId === req.user.id)
      // // console.log("isCart",isCart)
      // //   console.log("isSubscribed",isSubscribed);

      // // //   return {
      // // //     isSubscribed: isSubscribed ? true : false,
      // // //     ...channel
      // // //   }
      // // // })
      // //@ts-ignore
      // course.isCart = Cart ? true : false

      new SuccessResponse('fetch success', { course }).send(res);

    }
  )
  getPublicById = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { user, parms } = req;

      const course = await CourseRepo.findById(req.params.id);
      //@ts-ignore
      // const Cart = course.Cart.find((subs) => subs.userId === req.user.id)
      // // console.log("isCart",isCart)
      // //   console.log("isSubscribed",isSubscribed);

      // // //   return {
      // // //     isSubscribed: isSubscribed ? true : false,
      // // //     ...channel
      // // //   }
      // // // })
      // //@ts-ignore
      // course.isCart = Cart ? true : false

      new SuccessResponse('fetch success', { course }).send(res);

    }
  )

  getCoureByCategoryId = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { user, parms } = req;

      const course = await CourseRepo.findById(req.query.id);
      //@ts-ignore
      // const Cart = course.Cart.find((subs) => subs.userId === req.user.id)
      // // console.log("isCart",isCart)
      // //   console.log("isSubscribed",isSubscribed);

      // // //   return {
      // // //     isSubscribed: isSubscribed ? true : false,
      // // //     ...channel
      // // //   }
      // // // })
      // //@ts-ignore
      // course.isCart = Cart ? true : false

      new SuccessResponse('fetch success', { course }).send(res);

    }
  )

  getVideoById = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { user, params } = req;
      console.log("params.id", params.id)

      const video = await VideoRepo.findById(params.id);

      new SuccessResponse('fetch success', { video }).send(res);

    }
  )

  createReview = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { body, user } = req;
      console.log("course", body)
      // body.name = body.name.toLowerCase();
      // if (!body.slug) {
      //   body.slug = body.name.slice(0, 2) + "-" + Math.floor((Math.random() * 10000) + 1);
      // }
      body.userId = user.id
      console.log("body", body)

      const review = await courseReviewRepo.create({ review: body })
      new SuccessResponse('create success', { review }).send(res);
    }
  )

  updateReview = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      const { body, params } = req;
      console.log("body", body)
      // body.name = body.name.toLowerCase();
      const course = await courseReviewRepo.update({ id: params.id, review: body })
      console.log("body", body)
      new SuccessResponse('update success', { course }).send(res);
    }
  )
  getCourseReviewById = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { user, parms } = req;

      const course = await courseReviewRepo.findById(req.params.id);

      new SuccessResponse('fetch success', { course }).send(res);

    }

  )

  getAllCourseReviewByCourseId = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { user, parms } = req;

      const reviews = await courseReviewRepo.find(req.params.id);

      new SuccessResponse('fetch success', { reviews }).send(res);

    }

  )

  deleteCourseReview = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      const { params } = req;
      const category = await courseReviewRepo.delete(params.id);
      new SuccessResponse('delete success', { category }).send(res);
    }
  )
}
