import { Router } from 'express';
import { Controller } from './student.controller';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from "./schema"

export class StudentRoutes {

  readonly router: Router = Router();
  readonly controller: Controller = new Controller()

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {

    this.router.get(
      '/students',
      this.controller.getAll
    )

    this.router.get(
      '/students/:_id',
      validator(schema.paramsId, ValidationSource.PARAM),
      this.controller.getById
    )

    this.router.post(
      '/students',
      validator(schema.create),
      this.controller.add
    )

    this.router.delete(
      '/students/:_id',
      validator(schema.paramsId, ValidationSource.PARAM),
      this.controller.delete
    )

    this.router.put(
      '/students/:_id',
      validator(schema.paramsId, ValidationSource.PARAM),
      this.controller.update
    )
  }

}
