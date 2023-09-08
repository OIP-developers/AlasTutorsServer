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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepo = void 0;
const Order_1 = require("./Order");
class OrderRepo {
    // public static findById(id: Order['id']) {
    // public static findById({ where }: { where: Prisma.OrderWhereUniqueInput }) {
    //   return OrderModel.findUnique({
    //     where,
    //     include: {
    //       invoice: true,
    //       items: {
    //         include: {
    //           course: true,
    //         },
    //       },
    //       user: {
    //         include: {
    //           role: true,
    //         },
    //       },
    //     },
    //   });
    // }
    // public static findByUserId({ where, }: { where: Prisma.OrderWhereUniqueInput; }) {
    //   return OrderModel.findUnique({
    //     where,
    //     include: {
    //       invoice: true,
    //       items: {
    //         include: {
    //           course: true,
    //         },
    //       },
    //       user: {
    //         include: {
    //           role: true,
    //         },
    //       },
    //     },
    //   });
    // }
    // public static findOne({ where }: { where: Prisma.OrderWhereInput }) {
    //   return OrderModel.findFirst({ where: { ...where } });
    // }
    // public static async findMany<WhereInput, Delegate>({
    //   Model,
    //   where,
    //   search,
    //   page = "1",
    //   limit = "10",
    //   fullTextSearch,
    // }: {
    //   Model: Delegate;
    //   where: WhereInput;
    //   search: string | undefined;
    //   page: string;
    //   limit: string;
    //   fullTextSearch: string[];
    // }) {
    //   if (search) {
    //     where = {
    //       ...where,
    //       OR: fullTextSearch.map((key) => {
    //         return { name: { search } };
    //       }),
    //     };
    //   }
    //   console.log(JSON.stringify(where, null, 2));
    //   // pagination
    //   const crPage = parseInt(page, 10) || 1;
    //   const crLimit = parseInt(limit, 10) || 10;
    //   const startIndex = (crPage - 1) * crLimit;
    //   const endIndex = crPage * crLimit;
    //   // @ts-ignore
    //   const total = await Model.count({ where });
    //   const pages = Math.ceil(total / crLimit);
    //   const pagination: any = {};
    //   pagination.total = total;
    //   pagination.pages = pages;
    //   if (endIndex < total) {
    //     pagination.next = {
    //       page: crPage + 1,
    //       limit: crLimit,
    //     };
    //   }
    //   if (startIndex > 0) {
    //     pagination.prev = {
    //       page: crPage - 1,
    //       limit: crLimit,
    //     };
    //   }
    //   // @ts-ignore
    //   const entities = await Model.findMany({
    //     where,
    //     skip: crLimit * (crPage - 1),
    //     take: crLimit,
    //   });
    //   return { entities, pagination };
    // }
    // public static find({ where }: { where: Prisma.OrderWhereInput }) {
    //   return OrderModel.findMany({
    //     where,
    //     include: {
    //       invoice: true,
    //       items: {
    //         include: {
    //           product: true,
    //         },
    //       },
    //       user: {
    //         include: {
    //           role: true,
    //         },
    //       },
    //     },
    //   });
    // }
    static create({ body, user, items, }) {
        return __awaiter(this, void 0, void 0, function* () {
            // const employee = await UserModel.findFirst({
            //   where: {
            //     role: {
            //       code: 'EMPLOYEE'
            //     }
            //   }
            // })
            // const manufacturer = await UserModel.findFirst({
            //   where: {
            //     role: {
            //       code: 'MANUFACTURER'
            //     }
            //   }
            // })
            // if (!employee || !manufacturer) throw new BadRequestError('Employee or Manufacture not found')
            return Order_1.OrderModel.create({
                data: {
                    userId: user.id,
                    total: body.total,
                    items: {
                        createMany: {
                            data: items.map((item) => {
                                return item;
                            }),
                        },
                    },
                },
            });
        });
    }
}
exports.OrderRepo = OrderRepo;
//# sourceMappingURL=order.repository.js.map