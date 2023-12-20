import { Router } from 'express';
import { AdminSettingController } from './adminSetting.controller';
import validator, { ValidationSource } from '../../../validations/validator';
import schema from "./schema"

export class AdminSettingnRoutes {

  readonly router: Router = Router();
  readonly controller: AdminSettingController = new AdminSettingController()

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {

    this.router.get(
      '/',
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
