import { Response, Request, NextFunction } from "express";
import { ProtectedRequest } from "../../../types/app-request";
import asyncHandler from "../../../helpers/async";
import OrderRepo from './order.repository';
import { BadRequestError, NoDataError } from '../../../core/ApiError';
import { SuccessResponse } from '../../../core/ApiResponse';
import Order, { OrderModel } from './Order'
import { Prisma } from "@prisma/client";
import { Repository } from '../common/repository'

export class OrderController {

  // getAll = asyncHandler(
  //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
  //     const categories = await OrderRepo.find({ where: {} });
  //     if (categories.length === 0) throw new NoDataError();
  //     new SuccessResponse('fetch success', { categories }).send(res);

  //   }
  // )

  getAll = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { query } = req

      const { entities, pagination } = await Repository.findMany<
        Prisma.OrderWhereInput,
        Prisma.OrderDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>,
        Prisma.OrderSelect,
        Prisma.OrderInclude
      >({
        Model: OrderModel,
        where: {},
        include: {
          invoice: true,
          items: true,
          user: true
        },
        search: query.search,
        limit: query.limit,
        page: query.page,
        fullTextSearch: ['fullname', 'title']
      });
      new SuccessResponse('fetch success', { entities, pagination }).send(res);

    }
  )

  getById = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      const entity = await OrderRepo.findById({ where: { id: req.params.id } });
      if (!entity) throw new NoDataError();
      new SuccessResponse('fetch success', { entity }).send(res);
    }
  )

  create = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { body , user } = req;
      // const products: string[] = body.products;
      const order = await OrderRepo.create({ body: body, user:user });
      new SuccessResponse('create success', { order }).send(res);
    }
  )

  statusUpdate = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { body, params } = req;

      // const isExist = await OrderRepo.findOne({ name: body.name } as Order)
      // if (isExist) throw new BadRequestError("this order type already exist!")

      const order = await OrderRepo.statusUpdate({ id: params.id, status: body });
      new SuccessResponse('status updated success', { order }).send(res);
    }
  )

  update = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      const { body, params } = req;
      body.name = body.name.toLowerCase();
      const order = await OrderRepo.update({ id: params.id, order: body });
      new SuccessResponse('update success', { order }).send(res);
    }
  )

  delete = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      const { params } = req;
      const order = await OrderRepo.delete(params.id);
      new SuccessResponse('delete success', { order }).send(res);
    }
  )

}
