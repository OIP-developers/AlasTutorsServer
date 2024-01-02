import { Router } from 'express';
import { Controller } from './referral.controller';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from "./schema"
import authentication from '../../../middleware/authentication';

export class ReferralRoutes {

  readonly router: Router = Router();
  readonly controller: Controller = new Controller()

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {

    this.router.post(
      '/create',
      authentication,
      this.controller.createReferral
    )

    this.router.post(
      '/verify',
      this.controller.verifyStatus
    )

  }

}
