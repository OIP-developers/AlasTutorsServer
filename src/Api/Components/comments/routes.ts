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
      '/:_id',
      validator(schema.paramsId, ValidationSource.PARAM),
      this.controller.getById
    )

    this.router.post(
      '/',
      validator(schema.create, ValidationSource.BODY),
      this.controller.add
    )

    this.router.patch(
      '/:_id',
      authentication,
      validator(schema.paramsId && schema.addComment, ValidationSource.BODY),
      this.controller.addComment
    )
    this.router.patch(
      '/annotation/:_id',
      authentication,
      validator(schema.paramsId , ValidationSource.PARAM),
      this.controller.updateAnnotation
    )

    this.router.patch(
      '/reply/:_id',
      authentication,
      validator(schema.paramsId && schema.addreply, ValidationSource.BODY),
      this.controller.addReply
    )

    this.router.patch(
      '/like/:_id',
      authentication,
      validator(schema.paramsId && schema.addLike, ValidationSource.BODY),
      this.controller.addLike
    )

    this.router.delete(
      '/like/:_id',
      authentication,
      validator(schema.paramsId, ValidationSource.PARAM),
      this.controller.removeLike
    )

    this.router.delete(
      '/reply/:_id',
      authentication,
      validator(schema.paramsId , ValidationSource.PARAM),
      this.controller.removeReply
    )
    
    this.router.delete(
      '/:_id',
      authentication,
      validator(schema.paramsId, ValidationSource.PARAM),
      this.controller.removeComment
    )
  }
}
