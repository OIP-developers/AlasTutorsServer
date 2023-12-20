import { Router } from 'express';
import { JobController } from './job.controller';
import validator, { ValidationSource } from '../../../validations/validator';
import authentication from '../../../middleware/authentication';
import { CreateJobValidationSchema } from '../../../validations/payloadSchema/JobSchema';

export class JobRoutes {

  readonly router: Router = Router();
  readonly controller: JobController = new JobController()

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {

    this.router.post(
      '/',
      authentication,
      validator(CreateJobValidationSchema),
      this.controller.add
    )

    this.router.get(
      '/open/:job_url_code',
      // validator(CreateJobSchema),
      this.controller.getPublicOpenJobByURL
    )

    this.router.get(
      '/open',
      authentication,
      this.controller.getPublicOpenJobs
    )

  }

}
