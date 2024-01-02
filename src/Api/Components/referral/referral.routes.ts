import { Router } from 'express';
import { Controller } from './referral.controller';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from "./schema"

export class ReferralRoutes {

  readonly router: Router = Router();
  readonly controller: Controller = new Controller()

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {

    this.router.post(
      '/',
      this.controller.createReferral
    )



    // this.router.post(
    //   '/',
    //   this.controller.varifyStatus
    // )

  }

}
