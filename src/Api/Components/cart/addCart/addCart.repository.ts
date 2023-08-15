
// import { Prisma } from '@prisma/client';
// import AddCart, { AddCartModel } from './AddCart';
// // import User, { UserModel } from '../../../Api/Components/access/User';
// import { includes } from 'lodash';

// export default class AddCartRepo {
//   public static async create(userId:any,cartId:any) {
//     console.log("repo",cartId)
//     return AddCartModel.create({
//       data: {
//         userId: userId,
//         cartId: cartId,
  
//       }
//     });
//   }

//   // // public static findById(id: Cart['id']) {
//   // public static findById({ id }: { id: Cart['id'] }) {
//   //   return CartModel.findUnique(
//   //     {
//   //       where: { id },
//   //       include: {
//   //     course: true
//   //       }
//   //     }

//   //   )
//   // }

//   // public static findOne({ where }: { where: Prisma.CartWhereInput }) {
//   //   return CartModel.findFirst({ where: { ...where } })
//   // }


//   // public static async findMany<WhereInput, Delegate>(
//   //   { Model, where, search, page = '1', limit = '10', fullTextSearch }: {
//   //     Model: Delegate,
//   //     where: WhereInput,
//   //     search: string | undefined,
//   //     page: string,
//   //     limit: string,
//   //     fullTextSearch: string[]
//   //   }
//   // ) {

//   //   if (search) {
//   //     where = {
//   //       ...where,
//   //       OR: fullTextSearch.map((key) => {
//   //         return { name: { search } }
//   //       })
//   //     }
//   //   }

//   //   console.log(JSON.stringify(where, null, 2));

//   //   // pagination
//   //   const crPage = parseInt(page, 10) || 1;
//   //   const crLimit = parseInt(limit, 10) || 10;
//   //   const startIndex = (crPage - 1) * crLimit;
//   //   const endIndex = crPage * crLimit;
//   //   // @ts-ignore
//   //   const total = await Model.count({ where });
//   //   const pages = Math.ceil(total / crLimit)

//   //   const pagination: any = {};
//   //   pagination.total = total
//   //   pagination.pages = pages

//   //   if (endIndex < total) {
//   //     pagination.next = {
//   //       page: crPage + 1,
//   //       limit: crLimit,
//   //     };
//   //   }

//   //   if (startIndex > 0) {
//   //     pagination.prev = {
//   //       page: crPage - 1,
//   //       limit: crLimit,
//   //     };
//   //   }

//   //   // @ts-ignore
//   //   const entities = await Model.findMany({
//   //     where,
//   //     skip: crLimit * (crPage - 1),
//   //     take: crLimit
//   //   })
//   //   return { entities, pagination }
//   // }

//   // public static find({ where }: { where: Prisma.CartWhereInput }) {
//   //   return CartModel.findMany({ where: { isDeleted: false }, orderBy: { createdAt: 'desc' }, include: { 
//   //     course: {
//   //       include:{
//   //         thumbnail:true
//   //       }
//   //     },

    
//   //   } })
//   // }




//   // public static async update(
//   //   { id, body }: { id: Cart['id'], body: Prisma.CartUncheckedCreateInput }
//   // ) {
//   //   // console.log("--------=====",id,cart);

//   //   return CartModel.update({
//   //     where: { id },
//   //     data: {
//   //       courseId: body.courseId,
//   //       // quantity: body.quantity
//   //     }
//   //   });
//   // }

//   // public static async delete(id: Cart['id']) {
//   //   return CartModel.delete({
//   //     where: { id }
//   //   });
//   // }

//   // public static async deleteMany(userId: Cart['userId']) {
//   //   return CartModel.deleteMany({
//   //     where: { userId }
//   //   });
//   // }

// }
