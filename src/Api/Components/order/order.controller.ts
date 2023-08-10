import { Response, Request, NextFunction } from "express";
import asyncHandler from "../../../helpers/async";
import { OrderRepo } from "./order.repository";
import { BadRequestError, NoDataError } from "../../../core/ApiError";
import { BadRequestResponse, SuccessResponse } from "../../../core/ApiResponse";
import { OrderModel } from "./Order";
// import { OrderStatus, Prisma, RoleCode } from "@prisma/client";
import { Repository } from "../common/repository";
import { InvoiceService } from "../invoice/invoice.service";
// import { ProductRepo } from "../product/product.repository";
// import { ProductModel } from "../product/Product";
// import ConversationRepo from "../conversation/converstion.repository";
import CartRepo from "../cart/cart.repository";
import { CourseModel } from "../course/Course";

export class OrderController {
  readonly invoiceService: InvoiceService = new InvoiceService();

  // getAll = asyncHandler(
  //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
  //     const categories = await OrderRepo.find({ where: {} });
  //     if (categories.length === 0) throw new NoDataError();
  //     new SuccessResponse('fetch success', { categories }).send(res);

  //   }
  // )

  // getAll = asyncHandler(
  //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
  //     const { query, user } = req;

  //     let where: Prisma.OrderWhereInput = {}

  //     if (user.role.code === RoleCode.MANUFACTURER) {
  //       where = {
  //         ...where,
  //         status: {
  //           in: ["MANUFACTURER_REVIEW_INPROGRESS"]
  //         }
  //       }
  //     } else if (user.role.code === RoleCode.EMPLOYEE) {
  //       where = {
  //         ...where,
  //         status: {
  //           in: ["CUSTOMER_CHECKOUT", "CUSTOMER_REQUEST_VERIFICATION_INPROGRESS", "CUSTOMER_REQUEST_VERIFICATION_CANCELLED"]
  //         }
  //       }
  //     } else if (user.role.code === RoleCode.CUSTOMER) {
  //       where = {
  //         ...where,
  //         userId: user.id
  //       }
  //     }

  //     const { entities, pagination } = await Repository.findMany<
  //       Prisma.OrderWhereInput,
  //       Prisma.OrderDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>,
  //       Prisma.OrderSelect,
  //       Prisma.OrderInclude
  //     >({
  //       Model: OrderModel,
  //       where,
  //       include: {
  //         invoice: true,
  //         items: {
  //           include: {
  //             product: {
  //               select: {
  //                 id: true,
  //                 title: true,
  //                 product_image: true,
  //                 price: true,
  //                 categories: {
  //                   where: {
  //                     categoryId: undefined
  //                   },
  //                   select: {
  //                     category: {
  //                       select: {
  //                         id: true,
  //                         slug: true,
  //                         title: true,
  //                       }
  //                     }
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         },
  //         user: {
  //           include: {
  //             role: true,
  //           },
  //         },
  //       },
  //       search: query.search,
  //       limit: query.limit,
  //       page: query.page,
  //       fullTextSearch: ["orderNo"],
  //     });
  //     new SuccessResponse("fetch success", { entities, pagination }).send(res);
  //   }
  // );

  // getById = asyncHandler(
  //   async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  //     const entity = await OrderRepo.findById({ where: { id: req.params.id } });
  //     if (!entity) throw new NoDataError();
  //     new SuccessResponse("fetch success", { entity }).send(res);
  //   }
  // );

  // getByUserId = asyncHandler(
  //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
  //     // console.log("user")
  //     const { user } = req;
  //     const UserOrder = await OrderRepo.find({ where: { userId: user.id, status: OrderStatus.CUSTOMER_CHECKOUT } });
  //     //    return console.log("user")
  //     if (!UserOrder) throw new NoDataError();
  //     new SuccessResponse("fetch success", { UserOrder }).send(res);
  //   }
  // );

  // UpdateUserPlaceOrder = asyncHandler(
  //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
  //     // console.log("user")
  //     const { user } = req;
  //     const entities = await OrderRepo.updateMany({
  //       where: {
  //         userId: user.id,
  //         status: "CUSTOMER_CHECKOUT"
  //       },
  //       order: {
  //         status: "CUSTOMER_REQUEST_VERIFICATION_INPROGRESS"
  //       }
  //     });
  //     //    return console.log("user")
  //     new SuccessResponse("fetch success", { entities }).send(res);
  //   }
  // );

  create = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { body, user } = req;

      console.log("User Role", body);

      const items: any[] = body.items; // { productId: string, quantity: number }[]
      const participants: string[] = [];
      let totalPriceSum = 0

      for await (const item of items) {
        if (!item.courseId) throw new BadRequestError('product id must');
        const orderprice = await CourseModel.findFirst({
          where: {
            id: item.productId,
          }
        });
        if (!orderprice) throw new BadRequestError('Product not found');
        const newprice = orderprice.price;
        // const totalQty = item.quantity

        // console.log("itempeice", newprice)
        // console.log("Order QUantity", totalQty)
        const totalPrice = Number(orderprice.price) ;
        totalPriceSum += totalPrice;
        console.log("total Order Price", totalPriceSum)
        console.log("total Order Price", totalPriceSum)

        // console.log("Product variation", orderprice.id, orderprice);
      }

      body.total = totalPriceSum;

      const order = await OrderRepo.create({ body: body, user: user, items });
      await CartRepo.deleteMany(user.id)
      // participants.push(order.employeeId, order.manufacturerId, order.userId);

      // const conversation = await ConversationRepo.create({ name: `#${order.orderNo}`, orderId: order.id }, participants);

      // const { payment, invoice } =
      //   await this.invoiceService.paymentIntentCreate({
      //     user: req.user,
      //     orderId: order.id,
      //   });

      new SuccessResponse("create success", { order }).send(res);
    }
  );

  // statusUpdate = asyncHandler(
  //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
  //     const { body, params } = req;

  //     // const isExist = await OrderRepo.findOne({ name: body.name } as Order)
  //     // if (isExist) throw new BadRequestError("this order type already exist!")
  //     const order = await OrderRepo.statusUpdate({
  //       id: params.id,
  //       data: body,
  //     });
  //     new SuccessResponse("status updated success", { order }).send(res);
  //   }
  // );

  // updateOrderByManufacturer = asyncHandler(
  //   async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  //     const { body, params } = req;
  //     // body.name = body.name.toLowerCase();
  //     body.total = body.grossPrice + body.netPrice
  //     body.status = OrderStatus.PURCHASE_ORDER_INPROGRESS
  //     const order = await OrderRepo.update({ id: params.id, order: body });
  //     new SuccessResponse("update success", { order }).send(res);
  //   }
  // );

  // updateOrderByEmployee = asyncHandler(
  //   async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  //     const { body, params } = req;
  //     // body.name = body.name.toLowerCase();
  //     const totalPrice = await OrderRepo.findById({ where: { id: params.id } })
  //     if (!totalPrice) throw new BadRequestError("Invalid Order")

  //     body.total = totalPrice.total + body.margin
  //     body.status = OrderStatus.PURCHASE_ORDER_APPROVE

  //     const order = await OrderRepo.update({ id: params.id, order: body });
  //     new SuccessResponse("update success", { order }).send(res);
  //   }
  // );

  // updateOrderByCustomer = asyncHandler(
  //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
  //     const { body, params, user } = req;
  //     // body.name = body.name.toLowerCase();
  //     const orderConfirm = await OrderRepo.findOne({
  //       where: { id: params.id, status: "PURCHASE_ORDER_APPROVE", userId: user.id }
  //     })
  //     if (!orderConfirm) throw new BadRequestResponse("Order not found")

  //     body.status = OrderStatus.CUSTOMER_REQUEST_VERIFICATION_APPROVED

  //     const order = await OrderRepo.update({ id: params.id, order: body });
  //     new SuccessResponse("update success", { order }).send(res);
  //   }
  // );

  // reviewManufacturerEdits = asyncHandler(
  //   async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  //     const entities = await OrderRepo.find({
  //       where: {
  //         status: {
  //           in: ["PURCHASE_ORDER_INPROGRESS", "PURCHASE_ORDER_APPROVE"]
  //         }
  //       }
  //     });
  //     new SuccessResponse("fetch success", { entities }).send(res);
  //   }
  // );

  // delete = asyncHandler(
  //   async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  //     const { params } = req;
  //     const order = await OrderRepo.delete(params.id);
  //     new SuccessResponse("delete success", { order }).send(res);
  //   }
  // );

  // getOrderByVendorId = asyncHandler(
  //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
  //     const order = await ProductRepo.find({ where: { userId: req.user.id } });
  //     let orders;
  //     for await (const iterator of order) {
  //       orders = await OrderRepo.getProducts({
  //         productId: String(iterator.id),
  //       });
  //     }

  //     new SuccessResponse("fetch success", orders).send(res);
  //   }
  // );
}
