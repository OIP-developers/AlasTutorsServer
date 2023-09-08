"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const async_1 = __importDefault(require("../../../helpers/async"));
const order_repository_1 = require("./order.repository");
const ApiError_1 = require("../../../core/ApiError");
const ApiResponse_1 = require("../../../core/ApiResponse");
const invoice_service_1 = require("../invoice/invoice.service");
// import { ProductRepo } from "../product/product.repository";
// import { ProductModel } from "../product/Product";
// import ConversationRepo from "../conversation/converstion.repository";
const cart_repository_1 = __importDefault(require("../cart/cart.repository"));
const Course_1 = require("../course/Course");
class OrderController {
    constructor() {
        this.invoiceService = new invoice_service_1.InvoiceService();
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
        this.create = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, e_1, _b, _c;
            const { body, user } = req;
            console.log("User Role", body);
            const items = body.items; // { productId: string, quantity: number }[]
            const participants = [];
            let totalPriceSum = 0;
            try {
                for (var _d = true, items_1 = __asyncValues(items), items_1_1; items_1_1 = yield items_1.next(), _a = items_1_1.done, !_a;) {
                    _c = items_1_1.value;
                    _d = false;
                    try {
                        const item = _c;
                        if (!item.courseId)
                            throw new ApiError_1.BadRequestError('product id must');
                        const orderprice = yield Course_1.CourseModel.findFirst({
                            where: {
                                id: item.productId,
                            }
                        });
                        if (!orderprice)
                            throw new ApiError_1.BadRequestError('Product not found');
                        const newprice = orderprice.price;
                        // const totalQty = item.quantity
                        // console.log("itempeice", newprice)
                        // console.log("Order QUantity", totalQty)
                        const totalPrice = Number(orderprice.price);
                        totalPriceSum += totalPrice;
                        console.log("total Order Price", totalPriceSum);
                        console.log("total Order Price", totalPriceSum);
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = items_1.return)) yield _b.call(items_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            body.total = totalPriceSum;
            const order = yield order_repository_1.OrderRepo.create({ body: body, user: user, items });
            yield cart_repository_1.default.deleteMany(user.id);
            // participants.push(order.employeeId, order.manufacturerId, order.userId);
            // const conversation = await ConversationRepo.create({ name: `#${order.orderNo}`, orderId: order.id }, participants);
            // const { payment, invoice } =
            //   await this.invoiceService.paymentIntentCreate({
            //     user: req.user,
            //     orderId: order.id,
            //   });
            new ApiResponse_1.SuccessResponse("create success", { order }).send(res);
        }));
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
}
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map