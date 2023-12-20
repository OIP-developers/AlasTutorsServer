import Survey, { surveyModel, ISurvey } from './survey';
import UserSurvey, { userSurveyModel, IUserSurvey } from '../userSurvey/userSurvey';
import { NoDataError } from '../../../core/ApiError';
import { Schema } from 'mongoose';
import { COLLECTION_NAME as USER_SURVEY_COLLECTION_NAME } from '../userSurvey/userSurvey';

export default class SurveyRepo {

  public static find(business: Schema.Types.ObjectId): Promise<Survey[]> {
    return surveyModel
      .find({ isDeleted: false, business })
      .select("-isDeleted -updatedAt")
      .lean<Survey[]>()
      .exec();
  }
  public static findAll(): Promise<Survey[]> {
    return surveyModel
      .aggregate([
        {
          $group: {
            _id: null,
            totalCompletion: { $sum: '$completion' }
          },
        },
      ])
      .exec();
  }
  public static surveyCount() {
    return surveyModel
      .find({ isDeleted: false })
      .count()
  }

  public static findUserSurvey(business: Schema.Types.ObjectId): Promise<IUserSurvey[]> {
    return userSurveyModel
      .find({ isDeleted: false, user: business })
      .select("-isDeleted -updatedAt")
      // .populate({ path: 'survey_id', populate: { path: 'survey', select: 'name' } })
      .populate('survey_id', 'name description')
      .lean<IUserSurvey[]>()
      .exec();
  }

  public static findUserSurveyById(query: { _id: Schema.Types.ObjectId, user: Schema.Types.ObjectId }): Promise<IUserSurvey[]> {
    return userSurveyModel
      .findOne({ isDeleted: false, ...query })
      .select("-isDeleted -updatedAt")
      .lean<IUserSurvey[]>()
      .exec();
  }


  public static findBySurveyId(id: Schema.Types.ObjectId): Promise<Survey[]> {
    return surveyModel
      .aggregate([
        {
          "$match": {
            $expr: {
              $eq: ["$_id", { $toObjectId: id }],
            },
          },
        },
        {
          $lookup: {
            from: USER_SURVEY_COLLECTION_NAME,
            localField: '_id',
            foreignField: 'survey_id',
            as: 'survey_answers'
          }
        },
        { $project: {survey:1, survey_report: '$survey_answers.survey_answers' } }
      ]).exec()
  }

  
  public static findById(id: Schema.Types.ObjectId): Promise<Survey[]> {
    return surveyModel
      .findOne({ isDeleted: false, _id: id })
      .select("-isDeleted -updatedAt")
      .lean<Survey[]>()
      .exec();
  }

  public static async create(body: ISurvey): Promise<{ bucket: Survey }> {
    const bucket = await surveyModel.create({ ...body } as Survey);
    return { bucket };
  }

  public static async delete(id: string): Promise<{ bucket: any }> {
    const bucket = await surveyModel.findByIdAndDelete(id);
    if (!bucket) throw new NoDataError();
    return { bucket };
  }

  public static async updateCate(id: string, body: Survey): Promise<{ bucket: any }> {
    const bucket = await surveyModel.findByIdAndUpdate(id, { ...body } as Survey);
    if (!bucket) throw new NoDataError();
    return { bucket };
  }

  public static async updateUserSurvey(id: string, body: IUserSurvey): Promise<{ bucket: IUserSurvey }> {
    const bucket = await userSurveyModel.findOneAndUpdate({ _id: id }, { ...body } as UserSurvey, { new: true });
    if (!bucket) throw new NoDataError();
    return { bucket };
  }
}
