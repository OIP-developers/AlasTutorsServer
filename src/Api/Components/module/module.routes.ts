import { Router } from 'express';
import { Controller } from './module.controller';
import validator, { ValidationSource } from '../../../validations/validator';
import schema from "./schema"
import authentication from '../../../middleware/authentication';

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
      '/videos',
      this.controller.getWithOneVideo
    )

    this.router.get(
      '/:_id',
      validator(schema.paramsId, ValidationSource.PARAM),
      authentication,
      this.controller.getById
    )

    this.router.post(
      '/',
      validator(schema.create),
      this.controller.add
    )

    this.router.delete(
      '/:_id',
      validator(schema.paramsId, ValidationSource.PARAM),
      this.controller.delete
    )

    this.router.put(
      '/:_id',
      validator(schema.paramsId, ValidationSource.PARAM),
      this.controller.update
    )
  }

}
