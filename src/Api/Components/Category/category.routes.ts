import { Router } from 'express';
import { CategoryController } from './category.controller';
import validator, { ValidationSource } from '../../../validations/validator';
import authentication from '../../../middleware/authentication'
import schema from "./schema"

export class CategoryRoutes {

  readonly router: Router = Router();
  readonly controller: CategoryController = new CategoryController()

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
      '/survey/',
      // authentication,
      this.controller.getByUser
    )

    this.router.get(
      '/withSubCategory',
      this.controller.getWithSubCategory
    )

    this.router.post(
      '/',
      // validator(schema.create),
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
