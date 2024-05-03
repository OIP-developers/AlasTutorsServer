import { Router } from 'express';
import { Controller } from './teacher.controller';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from "./schema"

export class TeacherRoutes {

  readonly router: Router = Router();
  readonly controller: Controller = new Controller()

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {

    this.router.get(
      '/teachers',
      this.controller.getAll
    )

    this.router.get(
      '/teachers/:_id',
      validator(schema.paramsId, ValidationSource.PARAM),
      this.controller.getById
    )

    this.router.post(
      '/teachers',
      validator(schema.create),
      this.controller.add
    )

    this.router.delete(
      '/teachers/:_id',
      validator(schema.paramsId, ValidationSource.PARAM),
      this.controller.delete
    )

    this.router.put(
      '/teachers/:_id',
      validator(schema.paramsId, ValidationSource.PARAM),
      this.controller.update
    )
  }

}
