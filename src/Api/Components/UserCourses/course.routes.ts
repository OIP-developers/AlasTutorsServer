import { Router } from 'express';
import { UserCourseController } from './course.controller';
import validator, { ValidationSource } from '../../../validations/validator';
import authentication from '../../../middleware/authentication'
import schema from "./schema"

export class UserCourseRoutes {

  readonly router: Router = Router();
  readonly controller: UserCourseController = new UserCourseController()

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {

    this.router.get(
      '/',
      authentication,
      this.controller.getAll
    )

    this.router.post(
      '/',
      // validator(schema.create),
      authentication,
      this.controller.add
    )

    this.router.post(
      '/:course',
      // validator(schema.create),
      authentication,
      this.controller.startCourse
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
