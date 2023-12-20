import { Router } from 'express';
import { BusinessController } from './businessAnswers.controller';
import validator, { ValidationSource } from '../../../../validations/validator';
import schema from "./schema"
import authentication from '../../../../middleware/authentication';
import authorization from '../../../../middleware/authorization';
import { RoleCode } from '../../../../database/model/Role';

export class Routes {

  readonly router: Router = Router();
  readonly controller: BusinessController = new BusinessController()

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {

    this.router.get(
      '/',
      // authentication,
      // authorization([RoleCode.SUPER_ADMIN]),
      this.controller.getAll
    )

    this.router.get(
      '/:_id',
      this.controller.getById
    )

    this.router.post(
      '/',
      authentication,
      // authorization([RoleCode.SUPER_ADMIN]),
      // validator(schema.create),
      this.controller.add
    )

    this.router.delete(
      '/:_id',
      validator(schema.paramsId, ValidationSource.PARAM),
      this.controller.delete
    )

    this.router.patch(
      '/:_id',
      validator(schema.paramsId, ValidationSource.PARAM),
      this.controller.update
    )
  }

}
