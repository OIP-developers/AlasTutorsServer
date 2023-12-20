import { Router } from 'express';
import { SalaryFrequencyController } from './salaryFrequency.controller';
import validator, { ValidationSource } from '../../../validations/validator';
import authentication from '../../../middleware/authentication';
import { CreateSalaryFrequencyValidationSchema } from '../../../validations/payloadSchema/SalaryFrequencySchema';

export class SalaryFrequencyRoutes {

  readonly router: Router = Router();
  readonly controller: SalaryFrequencyController = new SalaryFrequencyController()

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {

    this.router.post(
      '/',
      authentication,
      // authorization([RoleCode.SUPER_ADMIN]),
      validator(CreateSalaryFrequencyValidationSchema),
      this.controller.add
    )

    this.router.get(
      '/',
      this.controller.getaAllSalaryFrequencys
    )

  }

}
