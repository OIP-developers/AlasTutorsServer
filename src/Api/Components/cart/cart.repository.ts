
// import { Prisma } from '@prisma/client';
// import Cart, { CartModel } from './Cart';
// import User, { UserModel } from './../access/User';
// import { includes } from 'lodash';

// export default class CartRepo {

//   // public static findById(id: Cart['id']) {
//   public static findById({ where }: { where: Prisma.UserWhereUniqueInput }) {
//     return UserModel.findUnique(
//       { 
//         where,
//         include:{
//           Cart:true
//         }
//       }
      
//     )
//   }

//   public static findOne({ where }: { where: Prisma.CartWhereInput }) {
//     return CartModel.findFirst({ where: { ...where } })
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

//   public static find({ where }: { where: Prisma.CartWhereInput }) {
//     return CartModel.findMany({ where: { isDeleted: false }, orderBy: { createdAt: 'desc' } })
//   }

//   public static async create({ body, user }: { body: Prisma.CartUncheckedCreateInput, user: any }) {
//     return CartModel.create({
//       data:{
//         userId : user.id,
//         ProductId : body.ProductId,
//         quantity : body.quantity
//       }
//     });
//   }


//   public static async update(
//     { id, body }: { id: Cart['id'], body: Prisma.CartUncheckedCreateInput }
//   ) {
//     // console.log("--------=====",id,cart);

//     return CartModel.update({
//       where: { id },
//       data:{
//         ProductId : body.ProductId,
//         quantity : body.quantity
//       }
//     });
//   }

//   public static async delete(id: Cart['id']) {
//     return CartModel.delete({
//       where: { id }
//     });
//   }

// }
