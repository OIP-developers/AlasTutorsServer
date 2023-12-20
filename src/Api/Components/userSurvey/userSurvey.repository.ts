import Survey, { userSurveyModel, IUserSurvey } from './userSurvey';
import { NoDataError } from '../../../core/ApiError';
import { Schema } from 'mongoose';

export default class SurveyRepo {

  public static find(business: Schema.Types.ObjectId): Promise<Survey[]> {
    return userSurveyModel
      .find({ isDeleted: false, business })
      .select("-isDeleted -updatedAt")
      .lean<Survey[]>()
      .exec();
  }

  public static findByUser(user: Schema.Types.ObjectId): Promise<Survey[]> {
    return userSurveyModel
      .findOne({ isDeleted: false, user })
      .select("-isDeleted -updatedAt")
      .lean<Survey[]>()
      .exec();
  }

  public static findById(id: Schema.Types.ObjectId): Promise<Survey[]> {
    return userSurveyModel
      .findOne({ isDeleted: false , _id : id })
      .select("-isDeleted -updatedAt")
      .lean<Survey[]>()
      .exec();
  }

  public static async create(body: IUserSurvey): Promise<{ bucket: Survey }> {
    const bucket = await userSurveyModel.create({ ...body } as Survey);
    return { bucket };
  }

  public static async delete(id: string): Promise<{ bucket: any }> {
    const bucket = await userSurveyModel.findByIdAndDelete(id);
    if (!bucket) throw new NoDataError();
    return { bucket };
  }

  public static async updateCate(id: string, body: Survey): Promise<{ bucket: any }> {
    const bucket = await userSurveyModel.findByIdAndUpdate(id, { ...body } as Survey);
    if (!bucket) throw new NoDataError();
    return { bucket };
  }

}
