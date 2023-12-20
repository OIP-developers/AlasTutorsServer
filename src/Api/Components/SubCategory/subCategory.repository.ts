import subCategory, { subCategoryModel } from './subCategory';
import { NoDataError } from '../../../core/ApiError';
import { Schema } from 'mongoose';

export default class SubCategoryRepo {

  public static find(category: Schema.Types.ObjectId): Promise<subCategory[]> {
    return subCategoryModel
      .find({ isDeleted: false, category })
      .select("-isDeleted -updatedAt")
      .lean<subCategory[]>()
      .exec();
  }

  public static async create(body: subCategory): Promise<{ bucket: subCategory }> {    
    const bucket = await subCategoryModel.create({ ...body } as subCategory);
    return { bucket };
  }

  public static async delete(id: string): Promise<{ bucket: any }> {
    const bucket = await subCategoryModel.findByIdAndDelete(id);
    if (!bucket) throw new NoDataError();
    return { bucket };
  }

  public static async updateCate(id: string, body: subCategory): Promise<{ bucket: any }> {
    const bucket = await subCategoryModel.findByIdAndUpdate(id, {...body}as subCategory);
    if (!bucket) throw new NoDataError();
    return { bucket };
  }

}
