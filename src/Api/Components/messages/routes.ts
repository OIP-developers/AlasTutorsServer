import { Router } from 'express';
import { Controller } from './controller';
import validator, { ValidationSource } from '../../../validations/validator';
import authentication from '../../../middleware/authentication';
// import schema from "./schema"

export class Routes {

  readonly router: Router = Router();
  readonly controller: Controller = new Controller()

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {

    this.router.get(
      '/',
      this.controller.getAll
    )

    this.router.patch(
      '/reply/:_id',
      authentication,
      // validator(schema.paramsId && schema.addreply, ValidationSource.BODY),
      this.controller.addReply
    )
    
    this.router.patch(
      '/like/:_id',
      authentication,
      // validator(schema.paramsId && schema.addLike, ValidationSource.BODY),
      this.controller.addLike
    )

    this.router.get(
      '/:_id',
      this.controller.getById
    )

    this.router.post(
      '/',
      authentication,
      this.controller.add
    )

    this.router.delete(
      '/:_id',
      this.controller.delete
    )

    this.router.put(
      '/:_id',
      // validator(schema.paramsId, ValidationSource.PARAM),
      this.controller.update
    )
  }

}
