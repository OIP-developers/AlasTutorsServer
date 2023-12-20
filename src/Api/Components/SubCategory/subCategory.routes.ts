import { Router } from 'express';
import { subCategoryController } from './subCategory.controller';
import validator, { ValidationSource } from '../../../validations/validator';
import schema from "./schema"

export class SubCategoryRoutes {

  readonly router: Router = Router();
  readonly controller: subCategoryController = new subCategoryController()

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {

    this.router.get(
      '/:category',
      this.controller.getAll
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
