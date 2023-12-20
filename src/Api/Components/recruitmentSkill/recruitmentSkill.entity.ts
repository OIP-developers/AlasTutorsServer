import { model, Schema, Document } from 'mongoose';
import { BUSINESS_COLLECTION_NAME } from "../business/business"
import { USER_COLLECTION_NAME } from "../../../database/model/User"

export const DOCUMENT_NAME = 'RecruitmentSkill';
export const COLLECTION_NAME = 'recruitmentSkill';

export default class RecruitmentSkill implements IRecruitmentSkill {
  name: string = "";
  businessId : string | any = "";
  userId : string | any = "";

}

export interface IRecruitmentSkill {
  name : string;
  businessId : string | any;
  userId : string | any;
}

const schema = new Schema<IRecruitmentSkill> (
  {
    businessId: { type: Schema.Types.ObjectId, ref: BUSINESS_COLLECTION_NAME, required: true},
    userId: { type: Schema.Types.ObjectId, ref: USER_COLLECTION_NAME , required: true},
    name: { type: Schema.Types.String, required: true },
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export const RecruitmentSkillModel = model<IRecruitmentSkill>(DOCUMENT_NAME, schema, COLLECTION_NAME)
