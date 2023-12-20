import { DataCopier } from "../../../utils/dataCopier";
import { IRecruitmentSkillService } from './irecruitmentSkill.service';
import { inject, injectable } from 'inversify';
import { CreateRecruitmentSkillPayloadDTO } from '../../../Interface/payloadInterface/RecruitmentSkill';
import User from '../../../database/model/User';
import { BadRequestError, NoDataError } from '../../../core/ApiError';
import SERVICE_IDENTIFIER from '../../../identifiers';
import IRecruitmentSkillRepository from './irecruitmentSkill.repository';
import RecruitmentSkill from './recruitmentSkill.entity';


@injectable()
export class RecruitmentSkillService implements IRecruitmentSkillService {

  constructor(
    @inject(SERVICE_IDENTIFIER.RecruitmentSkillRepository)
    private recruitmentSkillRepository: IRecruitmentSkillRepository,
    
  ){}


  async add(createSkillDTO: CreateRecruitmentSkillPayloadDTO, userData: User) : Promise<RecruitmentSkill>  {
    let recruitmentSkillData = DataCopier.assignToTarget(createSkillDTO, userData as User)
    const addSkillData = DataCopier.copyMultipleFromSourceArrayProperty(RecruitmentSkill , recruitmentSkillData, "skillNames" )
    console.log(addSkillData, "addSkillData")
    let result!: RecruitmentSkill
    try {
      // @ts-ignore
      result = await this.recruitmentSkillRepository.create(addSkillData)
    } catch (error) {
      throw new BadRequestError('Skill cannot be created')
    }
    return result
  }
  
}