
import { Prisma } from '@prisma/client';
import CourseReview, {CourseReviewModel } from './courseReview';

export default class courseReviewRepo {

  // public static findById(id: Category['id']) {
  public static findById(id: CourseReview['id']) {
    // console.log("whwrw",where)
    return CourseReviewModel.findUnique({ where:{
    id
    } 
  })
  }

  public static findOne({ where }: { where: Prisma.CourseReviewWhereInput }) {
    return CourseReviewModel.findFirst({ where: { ...where } })
  }

 
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

  public static async create({ review }: { review: Prisma.CourseReviewCreateInput }) {
    console.log("review",review)
    return CourseReviewModel.create({
      data: { ...review, }
    });
  }

  // public static async statusUpdate({ id, status }: { id: Category['id'], status: Prisma.CategoryUpdateInput }) {
  //   return CategoryModel.update({
  //     where: { id },
  //     data: {
  //       status: status.status
  //     }
  //   });
  // }
  public static find(id:any): Promise<CourseReview[] | null> {
    return CourseReviewModel.findMany({
     where:{courseId:id},
     include:{
      user:true,
     }
    })
  }

  public static async update(
    { id, review }: { id: CourseReview['id'], review: Prisma.CourseReviewUpdateInput }
  ) {
    // console.log("--------=====",id,category);

    return CourseReviewModel.update({
      where: { id },
      data: review
    });
  }

  public static async delete(id: CourseReview['id']) {
    return CourseReviewModel.delete({
      where: { id }
    });
  }

}