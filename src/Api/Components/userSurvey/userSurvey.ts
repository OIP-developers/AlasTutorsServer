import { model, Schema, Document } from 'mongoose';
import { BUSINESS_COLLECTION_NAME } from "../business/business"
import { USER_COLLECTION_NAME} from "../../../database/model/User"
import { COLLECTION_NAME as SURVEY_COLLECTION_NAME} from "../survey/survey"

export const DOCUMENT_NAME = 'UserSurvey';
export const COLLECTION_NAME = 'userSurvey';

export default interface UserSurvey extends Document, IUserSurvey { }

export interface IUserSurvey {
  survey: string;
  survey_id: string;
  survey_answers: any;
  completion: number;
  user: string;
  business: string;
}
// Use DBML to define your database structure
// Docs: https://github.com/holistics/dbml/tree/master/dbml-homepage/docs





const schema = new Schema(
  {
    survey: {
      type: Schema.Types.String,
      required: false,
    },
    survey_id: {
      type: Schema.Types.ObjectId,
      required: false,
      ref : "Survey"
    },
    survey_answers: {
      type: Schema.Types.Mixed,
      required: true,
    },
    completion: {
      type: Schema.Types.Number,
      required: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: USER_COLLECTION_NAME,
    },
    business: {
      type: Schema.Types.ObjectId,
      ref: BUSINESS_COLLECTION_NAME,
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export const userSurveyModel = model<UserSurvey>(DOCUMENT_NAME, schema, COLLECTION_NAME)
