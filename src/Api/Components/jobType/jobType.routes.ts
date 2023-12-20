import { Router } from 'express';
import { JobTypeController } from './jobType.controller';
import validator, { ValidationSource } from '../../../validations/validator';
import authentication from '../../../middleware/authentication';
import { CreateJobTypeValidationSchema } from '../../../validations/payloadSchema/JobTypeSchema';

export class JobTypeRoutes {

  readonly router: Router = Router();
  readonly controller: JobTypeController = new JobTypeController()

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {

    this.router.post(
      '/',
      authentication,
      // authorization([RoleCode.SUPER_ADMIN]),
      validator(CreateJobTypeValidationSchema),
      this.controller.add
    )

    this.router.get(
      '/',
      this.controller.getaAllJobTypes
    )

  }

}
