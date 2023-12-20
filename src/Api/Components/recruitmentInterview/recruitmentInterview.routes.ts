import { Router } from 'express';
import { RecruitmentInterviewController } from './recruitmentInterview.controller';
import validator, { ValidationSource } from '../../../validations/validator';
import authentication from '../../../middleware/authentication';
import { CreateRecruitmentInterviewValidationSchema } from '../../../validations/payloadSchema/RecruitmentInterviewSchema';

export class RecruitmentInterviewRoutes {

  readonly router: Router = Router();
  readonly controller: RecruitmentInterviewController = new RecruitmentInterviewController()

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {

    this.router.post(
      '/',
      authentication,
      validator(CreateRecruitmentInterviewValidationSchema),
      this.controller.add
    )

  }

}
