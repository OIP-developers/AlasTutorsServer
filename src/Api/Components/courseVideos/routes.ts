import { Router } from 'express';
import authentication from '../../../middleware/authentication';
import { Controller } from './controller';
// import validator, { ValidationSource } from '../../../helpers/validator';
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

    this.router.get(
      '/:_id',
      // validator(schema.paramsId, ValidationSource.PARAM),
      this.controller.getById
    )

    this.router.post(
      '/expression',
      authentication,
      // validator(schema.create),
      this.controller.addExpression
    )

    this.router.post(
      '/view',
      authentication,
      // validator(schema.create),
      this.controller.addView
    )

    this.router.post(
      '/question',
      authentication,
      // validator(schema.create),
      this.controller.addQuestion
    )

    this.router.post(
      '/answer',
      authentication,
      // validator(schema.create),
      this.controller.addAnswer
    )

    this.router.post(
      '/note',
      authentication,
      // validator(schema.create),
      this.controller.addNote
    )

    this.router.post(
      '/publishAI',
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
      // validator(schema.paramsId, ValidationSource.PARAM),
      this.controller.update
    )
  }

}
