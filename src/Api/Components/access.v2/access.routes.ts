import { Router } from 'express';
import { AccessController } from './access.controller';
import validator from '../../../helpers/validator';
import { userCredential, signUpSchema } from "../../../utils/joi.schema"

export class AccessRoutes {

  readonly router: Router = Router();
  readonly controller: AccessController = new AccessController()

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {

    this.router.post(
      '/signup',
      validator(signUpSchema),
      this.controller.signUp
    );

    this.router.post(
      '/signin',
      validator(userCredential),
      this.controller.signIn
    )

  }

}
