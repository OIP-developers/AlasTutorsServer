"use strict";
// import { Response, Request, NextFunction } from "express";
// import { ProtectedRequest } from "../../../types/app-request";
// import asyncHandler from "../../../helpers/async";
// import { ProductRepo } from './product.repository';
// import { BadRequestError } from '../../../core/ApiError';
// import { SuccessMsgResponse, SuccessResponse } from '../../../core/ApiResponse';
// import Product, { ProductModel } from './Product';
// import { Repository } from "../common/repository";
// import { Prisma } from "@prisma/client";
// export class ProductController {
//   getAll = asyncHandler(
//     async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
//       const { query } = req
//       const { entities, pagination } = await Repository.findMany<
//         Prisma.ProductWhereInput,
//         Prisma.ProductDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>,
//         Prisma.ProductSelect,
//         Prisma.ProductInclude
//       >({
//         Model: ProductModel,
//         where: {},
//         include: {
//           categories: {
//             select: {
//               category: true,
//             }
//           }
//         },
//         search: query.search,
//         limit: query.limit,
//         page: query.page,
//         fullTextSearch: ['title', 'desc', 'price']
//       });
//       // if (categories.length === 0) throw new NoDataError();
//       new SuccessResponse('fetch success', { entities, pagination }).send(res);
//     }
//   )
//   getById = asyncHandler(
//     async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
//       const entity = await ProductRepo.findById({ where: { id: req.params.id } });
//       new SuccessResponse('fetch success', { entity }).send(res);
//     }
//   )
//   create = asyncHandler(
//     async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
//       const { body } = req;
//       const categories: string[] = body.categories;
//       // const gallery: string[] = body.gallery;
//       // const tags: string[] = body.tags;
//       const product = await ProductRepo.create({ body: body, categories: categories });
//       new SuccessResponse('create success', { product }).send(res);
//     }
//   )
//   update = asyncHandler(
//     async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
//       const { body, params } = req;
//       const categories: string[] = body.categories;
//       const product = await ProductRepo.update({ id: params.id, body: body, categories: categories});
//       new SuccessResponse('update success', { product }).send(res);
//     }
//   )
//   delete = asyncHandler(
//     async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
//       const { params } = req;
//       const product = await ProductRepo.delete(params.id);
//       new SuccessResponse('delete success', { product }).send(res);
//     }
//   )
// }
//# sourceMappingURL=product.controller.js.map