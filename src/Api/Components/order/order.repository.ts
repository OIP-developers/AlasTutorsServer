import { Prisma } from "@prisma/client";
import Order, { OrderModel, OrderItemsModel } from "./Order";
import { UserModel } from "../access/User";
import { BadRequestError } from "../../../core/ApiError";

export class OrderRepo {
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

  public static async create({ body, user, items, }: { body: Prisma.OrderCreateInput; user: any; items: Prisma.OrderItemsCreateManyInput[]; }) {

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

    return OrderModel.create({
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
  }

  // public static async statusUpdate({ id, data, }: { id: Order["id"]; data: Prisma.OrderUpdateInput; }) {
  //   return OrderModel.update({
  //     where: { id },
  //     data,
  //   });
  // }

  // public static async update({ id, order, }: { id: Order["id"]; order: Prisma.OrderUpdateInput; }) {
  //   // console.log("--------=====",id,order);
  //   return OrderModel.update({
  //     where: { id },
  //     data: order,
  //     include: {
  //       items: {
  //         include: {
  //           product: true
  //         }
  //       }
  //     }
  //   });
  // }

  // public static async updateMany({ where, order, }: { where: Prisma.OrderWhereInput; order: Prisma.OrderUpdateInput; }) {
  //   // console.log("--------=====",id,order);
  //   return OrderModel.updateMany({
  //     where,
  //     data: order,
  //     // include: {
  //     //   items: {
  //     //     include: {
  //     //       product: true
  //     //     }
  //     //   }
  //     // }
  //   });
  // }

  // public static async delete(id: Order["id"]) {
  //   return OrderModel.delete({
  //     where: { id },
  //   });
  // }

  // public static getProducts({ productId }: { productId: string }) {
  //   return OrderItemsModel.findMany({
  //     where: { productId },
  //     include: {
  //       product: true,
  //     },
  //   });
  // }
}
