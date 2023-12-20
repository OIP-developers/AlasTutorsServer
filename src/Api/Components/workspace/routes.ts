import { Router } from 'express';
import { Controller } from './controller';
import validator, { ValidationSource } from '../../../validations/validator';
import schema from "./schema"
import authentication from '../../../middleware/authentication';

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
      validator(schema.paramsId, ValidationSource.PARAM),
      authentication,
      this.controller.getById
    )

    this.router.post(
      '/folder/favorite',
      validator(schema.favoriteFolder),
      authentication,
      this.controller.favouriteFolder
    )

    this.router.post(
      '/folder/file',
      validator(schema.favoriteFile),
      authentication,
      this.controller.favouriteFile
    )

    this.router.post(
      '/folder',
      validator(schema.createFolder),
      this.controller.addFolder
    )

    this.router.delete(
      '/folder/:_id',
      validator(schema.paramsId, ValidationSource.PARAM),
      this.controller.deleteFolder
    )

    this.router.put(
      '/folder/:_id',
      validator(schema.paramsId, ValidationSource.PARAM),
      this.controller.updateFolder
    )

    this.router.get(
      '/file/:_id',
      validator(schema.paramsId, ValidationSource.PARAM),
      this.controller.getFile
    )

    this.router.post(
      '/file',
      validator(schema.createFile),
      this.controller.addFile
    )

    this.router.post(
      '/',
      validator(schema.create),
      authentication,
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
