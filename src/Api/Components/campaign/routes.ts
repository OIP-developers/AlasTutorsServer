import { Router } from 'express';
import { Controller } from './controller';
import authentication from '../../../middleware/authentication';
import validator, { ValidationSource } from '../../../validations/validator';
import schema from "./schema"

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

    this.router.get(
      '/:_id',
      // validator(schema.paramsId, ValidationSource.PARAM),
      this.controller.getById
    )

    this.router.post(
      '/',
      authentication,
      // validator(schema.create),
      this.controller.add
    )

    this.router.delete(
      '/:_id',
      // validator(schema.paramsId, ValidationSource.PARAM),
      this.controller.delete
    )

    this.router.put(
      '/:_id',
      authentication,
      // validator(schema.paramsId, ValidationSource.PARAM),
      this.controller.update
    )
  }

}
