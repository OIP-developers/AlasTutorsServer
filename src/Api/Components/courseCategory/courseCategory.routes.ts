import { Router } from 'express';
import { courseCategoryController } from './courseCategory.controller';
import validator, { ValidationSource } from '../../../validations/validator';
// import schema from "./schema"

export class courseCategoryRoutes {

  readonly router: Router = Router();
  readonly controller: courseCategoryController = new courseCategoryController()

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {

    this.router.get(
      '/',
      this.controller.getAll
    )

    // this.router.get(
    //   '/withSubCategory',
    //   this.controller.getWithSubCategory
    // )

    this.router.post(
      '/',
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