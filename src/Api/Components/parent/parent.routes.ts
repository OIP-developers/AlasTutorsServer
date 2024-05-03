import { Router } from 'express';
import { Controller } from './parent.controller';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from "./schema"

export class ParentRoutes {

  readonly router: Router = Router();
  readonly controller: Controller = new Controller()

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {

    this.router.get(
      '/parent',
      this.controller.getAll
    )

    this.router.get(
      '/parent/:_id',
      validator(schema.paramsId, ValidationSource.PARAM),
      this.controller.getById
    )

    this.router.post(
      '/parent',
      validator(schema.create),
      this.controller.add
    )

    this.router.delete(
      '/parent/:_id',
      validator(schema.paramsId, ValidationSource.PARAM),
      this.controller.delete
    )

    this.router.put(
      '/parent/:_id',
      validator(schema.paramsId, ValidationSource.PARAM),
      this.controller.update
    )
  }

}
