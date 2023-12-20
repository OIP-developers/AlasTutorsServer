import { Aggregate } from 'mongoose'
import Category, { CategoryModel, DOCUMENT_NAME } from './Category';
import { NoDataError } from '../../../core/ApiError';
import { subCategoryModel, COLLECTION_NAME as SUBCATEGORY_COLLECTION_NAME } from '../SubCategory/subCategory';
import { COLLECTION_NAME as SIMPLEQUESTIONS_COLLECTION_NAME } from '../StrategyQuestions/Question';
import { COLLECTION_NAME as BCSANSWERS_COLLECTION_NAME } from '../BCSanswers/Modal';

interface categoryObject {
  [key: string]: any
}

interface AggregateCategory extends Category {
  [x: string]: any,
  subCategories: {
    [x: string]: any,
    questions: {
      [x: string]: any,
      answers: {
        [x: string]: any,
      }[]
    }[]
  }[]
}


export default class CategoryRepo {

  public static findWithDetails(userId: string): Promise<AggregateCategory[]> {
    // const userId = "6377318c093b2063a72e2e53"
    const categories = CategoryModel.aggregate([
      {
        $lookup: {
          from: SUBCATEGORY_COLLECTION_NAME,
          let: { categoryId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$category", "$$categoryId"] } } },
            {
              $lookup: {
                from: SIMPLEQUESTIONS_COLLECTION_NAME,
                let: { subCategoryId: "$_id" },
                pipeline: [
                  { $match: { $expr: { $eq: ["$subcategory", "$$subCategoryId"] } } },
                  {
                    $lookup: {
                      from: BCSANSWERS_COLLECTION_NAME,
                      let: { questionsId: "$_id" },
                      pipeline: [
                        { $match: { $expr: { $eq: ['$user', { $toObjectId: userId }] } } },
                        { $match: { $expr: { $eq: ["$question", "$$questionsId"] } } },
                      ],
                      as: "answers"
                    }
                  }
                ],
                as: "questions"
              }
            }
          ],
          as: "subCategories"
        }
      },
    ]).exec();
    return categories;
  }

  public static findByUser(): Promise<Category[]> {

    return CategoryModel
      .find({ isDeleted: false })
      .select("-isDeleted -updatedAt")
      .lean<Category[]>()
      .exec();
  }

  public static async create(body: Category): Promise<{ category: Category }> {
    const category = await CategoryModel.create({ ...body } as Category);
    return { category };
  }

  public static async delete(id: string): Promise<{ category: Category }> {
    const category = await CategoryModel.findByIdAndDelete(id);
    if (!category) throw new NoDataError();
    return { category };
  }

  public static async updateCate(id: string, body: Category): Promise<{ category: Category }> {
    const category = await CategoryModel.findByIdAndUpdate(id, { ...body } as Category);
    if (!category) throw new NoDataError();
    return { category };
  }

  public static async findWithSubCategory(): Promise<{ categories: Category[] }> {
    const categories = await CategoryModel.find();
    const arrSub: Category[] = []
    for await (const category of categories) {
      const subCategories = await subCategoryModel.find({ category: category._id })
      // @ts-ignore
      const collection = { ...category._doc, subCategories };
      arrSub.push(collection);
    }
    return { categories: arrSub }
  }

}
