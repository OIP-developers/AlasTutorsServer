import RecruitmentSkill, { RecruitmentSkillModel } from './recruitmentSkill.entity';
import ISkillRepository  from './irecruitmentSkill.repository';
import Repository from '../../../repository/repository';
import { injectable } from 'inversify';
import { Document, Types } from 'mongoose';


@injectable()
export default class RecruitmentSkillRepository extends Repository<RecruitmentSkill> implements ISkillRepository {
  model = RecruitmentSkillModel
}
