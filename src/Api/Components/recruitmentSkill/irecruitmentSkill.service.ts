import { CreateRecruitmentSkillPayloadDTO } from '../../../Interface/payloadInterface/RecruitmentSkill';
import Job from './recruitmentSkill.entity';



export interface IRecruitmentSkillService {

   add(bodyData: CreateRecruitmentSkillPayloadDTO, userData: any) : Promise<Job>


}
