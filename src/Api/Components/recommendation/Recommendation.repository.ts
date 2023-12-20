import Recommendation, { RecommendationModel, IRecommendation } from './Recommendation';
import { NoDataError } from '../../../core/ApiError';
import { Schema } from 'mongoose';

export default class RecommendationRepo {

  public static find(query: any): Promise<Recommendation[]> {
    return RecommendationModel
      .find({ isDeleted: false, ...query })
      .select("-isDeleted -updatedAt")
      .lean<Recommendation[]>()
      .exec();
  }

  public static findById(id: Schema.Types.ObjectId): Promise<Recommendation[]> {
    return RecommendationModel
      .findOne({ isDeleted: false, _id: id })
      .select("-isDeleted -updatedAt")
      .lean<Recommendation[]>()
      .exec();
  }

  public static async findByGoal(query: any): Promise<Recommendation[]> {
    console.log(query , "queryyyyyy")
    return RecommendationModel.find({ ...query }).lean<Recommendation[]>().exec();
  }

  public static async create(body: IRecommendation): Promise<{ task: Recommendation }> {
    const task = await RecommendationModel.create({ ...body } as Recommendation);
    return { task };
  }

  public static async delete(id: string): Promise<{ task: any }> {
    const task = await RecommendationModel.findByIdAndDelete(id);
    if (!task) throw new NoDataError();
    return { task };
  }

  public static async updateCate(id: string, body: Recommendation): Promise<{ task: any }> {
    const task = await RecommendationModel.findByIdAndUpdate(id, { ...body } as Recommendation);
    if (!task) throw new NoDataError();
    return { task };
  }

}
