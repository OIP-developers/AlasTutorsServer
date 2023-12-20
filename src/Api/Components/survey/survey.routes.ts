import { Router } from 'express';
import { SurveyController } from './survey.controller';
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
      '/user',
      authentication,
      this.controller.getUserSurvey
    )

    this.router.get(
      '/user/:_id',
      authentication,
      this.controller.getUserSurveyById
    )

    this.router.get(
      '/survey_report/:_id',
      authentication,
      this.controller.getSurveyAnsById
    )

    this.router.put(
      '/user/:_id',
      authentication,
      this.controller.updateUserSurvey
    )

    this.router.get(
      '/record',
      authentication,
      this.controller.getRecords
    )

    this.router.get(
      '/:_id',
      authentication,
      this.controller.getById
    )

    this.router.get(
      '/report/:_id',
      authentication,
      this.controller.getByIdForReport
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
