import { Router } from 'express';
import { AccessController } from './access.controller';
import validator, { ValidationSource } from '../../../helpers/validator';
import { signupSchema, userCredential, refreshToken } from "../../../utils/joi.schema"
import schema from './schema'
import authentication from '../../../middleware/authentication';
// import authorization from '../../../middleware/authorization';

export class AccessRoutes {

  readonly router: Router = Router();
  readonly controller: AccessController = new AccessController()

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {

    this.router.post(
      '/signup-teacher',
      // validator(signupSchema),
      this.controller.signupTeacher
    )

    this.router.post(
      '/signup-student',
      // validator(signupSchema),
      this.controller.signupStudent
    )

    this.router.post(
      '/signin',
      validator(userCredential),
      this.controller.signin
    )

    this.router.delete(
      '/signout',
      authentication,
      this.controller.signout
    )

    this.router.post(
      '/verify',
      authentication,
      this.controller.verify
    )

    this.router.post(
      '/refresh',
      authentication,
      validator(refreshToken),
      this.controller.refresh
    )

    this.router.get(
      '/user',
      this.controller.getUser
    )

    this.router.get(
      '/users',
      authentication,
      this.controller.getUsers
    )

    this.router.delete(
      '/users/:_id',
      authentication,
      this.controller.deleteUser
    )

    this.router.put(
      '/me',
      authentication,
      validator(schema.updateInfo),
      this.controller.updateMe
    )
    


    
  }

}
