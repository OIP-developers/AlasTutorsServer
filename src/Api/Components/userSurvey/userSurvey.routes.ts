import { Router } from 'express';
import { SurveyController } from './userSurvey.controller';
import validator, { ValidationSource } from '../../../validations/validator';
import authentication from '../../../middleware/authentication';
import schema from "./schema"

export class SurveyRoutes {

  readonly router: Router = Router();
  readonly controller: SurveyController = new SurveyController()

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {

    this.router.get(
      '/',
      authentication,
      this.controller.getAll
    )

    this.router.get(
      '/:_id',
      authentication,
      this.controller.getById
    )

    this.router.post(
      '/',
      authentication,
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
