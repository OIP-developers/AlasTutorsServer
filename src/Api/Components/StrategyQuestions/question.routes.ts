import { Router } from 'express';
import { QuestionController } from './question.controller';
import validator, { ValidationSource } from '../../../validations/validator';
import authentication from '../../../middleware/authentication';
import schema from "./schema"

export class QuestionRoutes {

  readonly router: Router = Router();
  readonly controller: QuestionController = new QuestionController()

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {

    this.router.get(
      '/:subcategory',
      this.controller.getAll
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
