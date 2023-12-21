import { Router } from 'express';
import { TaskController } from './Task.controller';
// import validator, { ValidationSource } from '../../../helpers/validator';
import authentication from '../../../middleware/authentication';
// import schema from "./schema"

export class Routes {

  readonly router: Router = Router();
  readonly controller: TaskController = new TaskController()

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {

    this.router.get(
      '/',
      // authentication,
      this.controller.getAll
    )

    this.router.get(
      '/:_id',
      // authentication,
      this.controller.getById
    )

    this.router.post(
      '/',
      // authentication,
      // validator(schema.create),
      this.controller.add
    )

    this.router.post(
      '/assigntask',
      // authentication,
      // validator(schema.create),
      this.controller.assignTask
    )

    this.router.delete(
      '/:_id',
      // validator(schema.paramsId, ValidationSource.PARAM),
      this.controller.delete
    )

    this.router.put(
      '/:_id',
      // validator(schema.paramsId, ValidationSource.PARAM),
      this.controller.update
    )
  }

}
