"use strict";
// import { Prisma } from '@prisma/client';
// import Category, { CategoryModel } from './Category';
// export default class CategoryRepo {
//   // public static findById(id: Category['id']) {
//   public static findById({ where }: { where: Prisma.CategoryWhereUniqueInput }) {
//     return CategoryModel.findUnique({ where })
//   }
//   public static findOne({ where }: { where: Prisma.CategoryWhereInput }) {
//     return CategoryModel.findFirst({ where: { ...where } })
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
//   public static find({ where }: { where: Prisma.CategoryWhereInput }) {
//     return CategoryModel.findMany({ where: { isDeleted: false }, orderBy: { createdAt: 'desc' } })
//   }
//   public static async create({ category }: { category: Prisma.CategoryCreateInput }) {
//     return CategoryModel.create({
//       data: { ...category, }
//     });
//   }
//   public static async statusUpdate({ id, status }: { id: Category['id'], status: Prisma.CategoryUpdateInput }) {
//     return CategoryModel.update({
//       where: { id },
//       data: {
//         status: status.status
//       }
//     });
//   }
//   public static async update(
//     { id, category }: { id: Category['id'], category: Prisma.CategoryUpdateInput }
//   ) {
//     // console.log("--------=====",id,category);
//     return CategoryModel.update({
//       where: { id },
//       data: category
//     });
//   }
//   public static async delete(id: Category['id']) {
//     return CategoryModel.delete({
//       where: { id }
//     });
//   }
// }
//# sourceMappingURL=category.repository.js.map