import { Router } from 'express';
import { JobApplicationController } from './jobApplication.controller';
import validator, { ValidationSource } from '../../../validations/validator';
import authentication from '../../../middleware/authentication';
import { 
  CreateCulturefyJobApplicationValidationSchema, 
  GetDropdownJobApplicantsByJobIdParamsValidationSchema, 
  GetDropdownJobApplicantsByJobIdQueryValidationSchema
 } from '../../../validations/payloadSchema/JobApplicationSchema';

export class JobApplicationRoutes {

  readonly router: Router = Router();
  readonly controller: JobApplicationController = new JobApplicationController()

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {

    this.router.post(
      '/',
      authentication,
      validator(CreateCulturefyJobApplicationValidationSchema),
      this.controller.add
    )

    this.router.get(
      '/job/:jobId/applicants',
      authentication,
      validator(GetDropdownJobApplicantsByJobIdParamsValidationSchema, ValidationSource.PARAM ),
      validator(GetDropdownJobApplicantsByJobIdQueryValidationSchema, ValidationSource.QUERY ),
      this.controller.getDropdownJobApplicantsByJobId
    )

  }

}
