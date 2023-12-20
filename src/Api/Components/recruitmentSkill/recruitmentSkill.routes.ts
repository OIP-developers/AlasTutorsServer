import { Router } from 'express';
import { RecruitmentSkillController } from './recruitmentSkill.controller';
import validator, { ValidationSource } from '../../../validations/validator';
import authentication from '../../../middleware/authentication';
import { CreateRecruitmentSkillValidationSchema } from '../../../validations/payloadSchema/RecruitmentSkillSchema';

export class RecruitmentSkillRoutes {

  readonly router: Router = Router();
  readonly controller: RecruitmentSkillController = new RecruitmentSkillController()

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {

    this.router.post(
      '/',
      authentication,
      validator(CreateRecruitmentSkillValidationSchema),
      this.controller.add
    )

  }

}
