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
const Course_Category_1 = require("./Course-Category");
class CourseCategoryRepo {
    // public static findById(id: Category['id']) {
    // public static findById({ where }: { where: Prisma.CategoryWhereUniqueInput }) {
    //   return CategoryModel.findUnique({ where })
    // }
    // public static findOne({ where }: { where: Prisma.CategoryWhereInput }) {
    //   return CategoryModel.findFirst({ where: { ...where } })
    // }
    // public static async findMany<WhereInput, Delegate>(
    //   { Model, where, search, page = '1', limit = '10', fullTextSearch }: {
    //     Model: Delegate,
    //     where: WhereInput,
    //     search: string | undefined,
    //     page: string,
    //     limit: string,
    //     fullTextSearch: string[]
    //   }
    // ) {
    //   if (search) {
    //     where = {
    //       ...where,
    //       OR: fullTextSearch.map((key) => {
    //         return { name: { search } }
    //       })
    //     }
    //   }
    //   console.log(JSON.stringify(where, null, 2));
    //   // pagination
    //   const crPage = parseInt(page, 10) || 1;
    //   const crLimit = parseInt(limit, 10) || 10;
    //   const startIndex = (crPage - 1) * crLimit;
    //   const endIndex = crPage * crLimit;
    //   // @ts-ignore
    //   const total = await Model.count({ where });
    //   const pages = Math.ceil(total / crLimit)
    //   const pagination: any = {};
    //   pagination.total = total
    //   pagination.pages = pages
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
    //     take: crLimit
    //   })
    //   return { entities, pagination }
    // }
    // public static find({ where }: { where: Prisma.CategoryWhereInput }) {
    //   return CategoryModel.findMany({ where: { isDeleted: false }, orderBy: { createdAt: 'desc' } })
    // }
    static create(courseCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            return Course_Category_1.CourseCategoryModel.create({
                data: courseCategory
            });
        });
    }
    static find() {
        return Course_Category_1.CourseCategoryModel.findMany({});
    }
    static update(id, courseCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            return Course_Category_1.CourseCategoryModel.update({
                where: { id },
                data: courseCategory
            });
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return Course_Category_1.CourseCategoryModel.delete({
                where: { id }
            });
        });
    }
    static findById(id) {
        console.log("params.id", id);
        return Course_Category_1.CourseCategoryModel.findUnique({
            where: { id },
            include: {
                // id:true,
                courses: {
                    include: {
                        thumbnail: true
                    }
                },
            }
        });
    }
}
exports.default = CourseCategoryRepo;
//# sourceMappingURL=course-category.repository.js.map