import { Response, Request, NextFunction } from "express";
import asyncHandler from "../../../helpers/async";
import CartRepo from './cart.repository';
import { BadRequestError, NoDataError } from '../../../core/ApiError';
import { SuccessResponse } from '../../../core/ApiResponse';
import Cart, { CartModel } from './Cart'
// import AddCartRepo from "./addCart/addCart.repository";

export class CartController {

  getByUser = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { user } = req
      const entities = await CartRepo.find({ where: { userId: user.id } });
      // if (entities.length === 0) throw new NoDataError();
      new SuccessResponse('fetch success', { entities }).send(res);

    }
  )

  // getAll = asyncHandler(
  //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
  //     const { query } = req

  //     const { entities, pagination } = await Repository.findMany<
  //       Prisma.CartWhereInput,
  //       Prisma.CartDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>,
  //       Prisma.CartSelect,
  //       Prisma.CartInclude
  //     >({
  //       Model: CartModel,
  //       where: {},
  //       search: query.search,
  //       limit: query.limit,
  //       page: query.page,
  //       fullTextSearch: ['fullname', 'title']
  //     });
  //     new SuccessResponse('fetch success', { entities, pagination }).send(res);

  //   }
  // )

  getById = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      const entity = await CartRepo.findById({ id: req.params.id });
      if (!entity) throw new NoDataError();
      new SuccessResponse('fetch success', { entity }).send(res);
    }
  )

  create = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { body, user } = req;
      body.userId = user.id
      const entity = await CartRepo.create({ data: body });
      //@ts-ignore
      // body.cartId  = entity.id
      // const addCart =await AddCartRepo.create(user.id,entity.id)
      // console.log("entity",entity)
      // console.log("addCart",addCart)
      new SuccessResponse('create success', { entity }).send(res);
    }
  )

  // statusUpdate = asyncHandler(
  //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
  //     const { body, params } = req;

  //     // const isExist = await CartRepo.findOne({ name: body.name } as Cart)
  //     // if (isExist) throw new BadRequestError("this cart type already exist!")

  //     const cart = await CartRepo.statusUpdate({ id: params.id, status: body });
  //     new SuccessResponse('status updated success', { cart }).send(res);
  //   }
  // )

  update = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      const { body, params } = req;
      const entity = await CartRepo.update({ id: params.id, body: body });
      new SuccessResponse('update success', { entity }).send(res);
    }
  )

  delete = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      const { params } = req;
      const entity = await CartRepo.delete(params.id);
      new SuccessResponse('delete success', { entity }).send(res);
    }
  )

}
