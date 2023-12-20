import SimpleQuestion, { SimpleQuestionModel } from './Question';
import { NoDataError } from '../../../core/ApiError';
import { Schema } from 'mongoose';

export default class QuestionRepo {

  public static find(subcategory: Schema.Types.ObjectId): Promise<SimpleQuestion[]> {
    return SimpleQuestionModel
      .find({ isDeleted: false, subcategory })
      .select("-isDeleted -updatedAt")
      .lean<SimpleQuestion[]>()
      .exec();
  }

  public static async create(body: SimpleQuestion): Promise<{ questionData: SimpleQuestion }> {
    const questionData = await SimpleQuestionModel.create({ ...body } as SimpleQuestion);
    return { questionData };
  }

  public static async delete(id: string): Promise<{ questionData: any }> {
    const questionData = await SimpleQuestionModel.findByIdAndDelete(id);
    if (!questionData) throw new NoDataError();
    return { questionData };
  }

  public static async updateCate(id: string, body: SimpleQuestion): Promise<{ questionData: any }> {
    const questionData = await SimpleQuestionModel.findByIdAndUpdate(id, { ...body } as SimpleQuestion);
    if (!questionData) throw new NoDataError();
    return { questionData };
  }

}
