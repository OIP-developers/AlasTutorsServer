// import { Response, Request, NextFunction } from "express";
// import { ProtectedRequest } from "../../../../types/app-request";
// import asyncHandler from "../../../../helpers/async";
// // import CategoryRepo from './category.repository';
// import { BadRequestError, NoDataError } from '../../../../core/ApiError';
// import { SuccessResponse } from '../../../../core/ApiResponse';
// import CourseSubCategory, { CourseSubCategoryModel } from './Sub-Course-Category'
// import { Prisma } from "@prisma/client";
// import { Repository } from '../../common/repository'
// import SubCourseCategoryRepo from "./sub-course-category.repository";
// // import CourseCategoryRepo from "./Course-Category";
// // import CourseCategoryRepo from "./course-category.repository";

// export class SubCourseCategoryController {

//   getAll = asyncHandler(
//     async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
//       const user = req.user;
      

//       const courseCategory = await SubCourseCategoryRepo.find();
//       console.log("sub",courseCategory)

//       new SuccessResponse('fetch success', { courseCategory }).send(res);

//     }
//   )
// //  getAll = asyncHandler(
// //     async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
// //       const { query } = req

// //       const { entities, pagination } = await Repository.findMany<
// //         Prisma.CourseSubCategoryWhereInput,
// //         Prisma.CourseSubCategoryDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>,
// //         Prisma.CourseSubCategorySelect,
// //         Prisma.CourseSubCategoryInclude
// //       >({
// //         Model: CourseSubCategoryModel,
// //         where: {},
// //         search: query.search,
// //         limit: query.limit,
// //         page: query.page,
// //         fullTextSearch: ['fullname', 'title']
// //       });
// //       new SuccessResponse('fetch success', { entities, pagination }).send(res);

// //     }
// //   )


//   delete = asyncHandler(
//     async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
//       const { params } = req;
//       const courseCategory = await SubCourseCategoryRepo.delete(params.id);
//       new SuccessResponse('delete success', { courseCategory }).send(res);
//     }
//   )

//   // getById = asyncHandler(
//   //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
//   //     const { user, parms } = req;

//   //     const courseCategory = await CourseCategoryRepo.findById(req.params.id);

//   //     new SuccessResponse('fetch success', { courseCategory }).send(res);

//   //   }
//   // )

//   create = asyncHandler(
//     async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
//       const { body } = req;

//       console.log("body", body)


//       const category = await SubCourseCategoryRepo.create({SubCourseCategory:body});
//       new SuccessResponse('create success', { category }).send(res);
//     }
//   )

//   update = asyncHandler(
//     async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
//       const { body, params } = req;
//       const courseCategory = await SubCourseCategoryRepo.update({id:params.id,category:body});
//       new SuccessResponse('update success', { courseCategory }).send(res);
//     }
//   )



// }
