
// import { Prisma } from '@prisma/client';
// import Order, { OrderModel } from './Order';

// export default class OrderRepo {

//   // public static findById(id: Order['id']) {
//   public static findById({ where }: { where: Prisma.OrderWhereUniqueInput }) {
//     return OrderModel.findUnique({ where })
//   }

//   public static findOne({ where }: { where: Prisma.OrderWhereInput }) {
//     return OrderModel.findFirst({ where: { ...where } })
//   }


//   public static async findMany<WhereInput, Delegate>(
//     { Model, where, search, page = '1', limit = '10', fullTextSearch }: {
//       Model: Delegate,
//       where: WhereInput,
//       search: string | undefined,
//       page: string,
//       limit: string,
//       fullTextSearch: string[]
//     }
//   ) {

//     if (search) {
//       where = {
//         ...where,
//         OR: fullTextSearch.map((key) => {
//           return { name: { search } }
//         })
//       }
//     }

//     console.log(JSON.stringify(where, null, 2));

//     // pagination
//     const crPage = parseInt(page, 10) || 1;
//     const crLimit = parseInt(limit, 10) || 10;
//     const startIndex = (crPage - 1) * crLimit;
//     const endIndex = crPage * crLimit;
//     // @ts-ignore
//     const total = await Model.count({ where });
//     const pages = Math.ceil(total / crLimit)

//     const pagination: any = {};
//     pagination.total = total
//     pagination.pages = pages

//     if (endIndex < total) {
//       pagination.next = {
//         page: crPage + 1,
//         limit: crLimit,
//       };
//     }

//     if (startIndex > 0) {
//       pagination.prev = {
//         page: crPage - 1,
//         limit: crLimit,
//       };
//     }

//     // @ts-ignore
//     const entities = await Model.findMany({
//       where,
//       skip: crLimit * (crPage - 1),
//       take: crLimit
//     })
//     return { entities, pagination }
//   }

//   public static find({ where }: { where: Prisma.OrderWhereInput }) {
//     return OrderModel.findMany({ where: { isDeleted: false }, orderBy: { createdAt: 'desc' } })
//   }

//   public static async create({ body, user }: { body: Prisma.OrderCreateInput , user: any }) {
//     return OrderModel.create({
//       data: {
//         ...body,
//         // userId: user.id,
//         // company_name: body.company_name,
//         // address: body.address,
//         // city: body.city,
//         // country: body.country,
//         // email: body.email,
//         // fullname: body.fullname,
//         // state: body.state,
//         // sub_total: body.sub_total,
//         // total: body.total,
//         // zip_code: body.zip_code,
//         // items: {
//         //   create: {
//         //     productId: body.productId,
//         //     quantity: body.quantity
//         //   }
//         // }
//       }
//     });
//   }

//   public static async statusUpdate({ id, status }: { id: Order['id'], status: Prisma.OrderUpdateInput }) {
//     return OrderModel.update({
//       where: { id },
//       data: {
//         status: status.status
//       }
//     });
//   }

//   public static async update(
//     { id, order }: { id: Order['id'], order: Prisma.OrderUpdateInput }
//   ) {
//     // console.log("--------=====",id,order);

//     return OrderModel.update({
//       where: { id },
//       data: order
//     });
//   }

//   public static async delete(id: Order['id']) {
//     return OrderModel.delete({
//       where: { id }
//     });
//   }

// }
