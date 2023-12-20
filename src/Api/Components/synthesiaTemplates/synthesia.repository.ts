import Synthesia, { synthesiaModel } from './synthesia';

export default class SurveyRepo {

  public static find(): Promise<Synthesia[]> {
    return synthesiaModel
    .find()
    .lean<Synthesia[]>()
    .exec();
  }

}
