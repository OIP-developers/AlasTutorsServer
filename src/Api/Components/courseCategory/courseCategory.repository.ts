import courseCategory, { courseCategoryModel, DOCUMENT_NAME } from './courseCategory';
import { NoDataError } from '../../../core/ApiError';
// import { Query, Schema, Types } from 'mongoose';
// import { subCategoryModel, COLLECTION_NAME as SUBCATEGORY_COLLECTION_NAME } from '../SubCategory/subCategory';
// import { SimpleQuestionModel, COLLECTION_NAME as SIMPLEQUESTIONS_COLLECTION_NAME } from '../StrategyQuestions/Question';

interface courseCategoryObject {
  [key: string]: any
}


export default class courseCategoryRepo {

  // public static findTest(): any {
  //   return courseCategoryModel.aggregate([
  //     {
  //       $lookup: {
  //         from: SUBCATEGORY_COLLECTION_NAME,
  //         localField: "_id",
  //         foreignField: "course",
  //         as: `subCategories`
  //       }
  //     },
  //     {
  //       $unwind: {
  //         path: "$subCategories",
  //         preserveNullAndEmptyArrays: true
  //       }
  //     },
  //     {
  //       $lookup: {
  //         from: `${SIMPLEQUESTIONS_COLLECTION_NAME}`,
  //         localField: "subCategories._id",
  //         foreignField: `subcategory`,
  //         as: "subCategories.questions"
  //       }
  //     },
  //     {
  //       $group: {
  //         _id: "$_id",
  //         title: { $first: "$title" },
  //         sort: { $first: "$sort" },
  //         icon: { $first: "$icon" },
  //         subCategories: { $push: "$subCategories" }
  //       }
  //     },
  //     {
  //       $sort: { sort: 1 }
  //     }
  //   ])
  //   // }
  //   // {
  //   //   from: "cultur.subCategories",
  //   //   localField: "course",
  //   //   foreignField: "_id",
  //   //   as: "results"
  // }

  public static find(): Promise<courseCategory[]> {
    return courseCategoryModel
      .find({ isDeleted: false })
      .select("-isDeleted -updatedAt")
      .lean<courseCategory[]>()
      .exec();
  }

  public static async create(body: courseCategory): Promise<{ course: courseCategory }> {
    const course = await courseCategoryModel.create({ ...body } as courseCategory);
    return { course };
  }

  public static async delete(id: string): Promise<{ course: courseCategory }> {
    const course = await courseCategoryModel.findByIdAndDelete(id);
    if (!course) throw new NoDataError();
    return { course };
  }

  public static async updateCate(id: string, body: courseCategory): Promise<{ course: courseCategory }> {
    const course = await courseCategoryModel.findByIdAndUpdate(id, { ...body } as courseCategory);
    if (!course) throw new NoDataError();
    return { course };
  }

  // public static async findWithSubCategory(): Promise<{ categories: courseCategory[] }> {
  //   const categories = await courseCategoryModel.find();
  //   const arrSub: courseCategory[] = []
  //   for await (const course of categories) {
  //     const subCategories = await subCategoryModel.find({ course: course._id })
  //     // @ts-ignore
  //     const collection = { ...course._doc, subCategories };
  //     arrSub.push(collection);
  //   }
  //   return { categories: arrSub }
  // }

}
