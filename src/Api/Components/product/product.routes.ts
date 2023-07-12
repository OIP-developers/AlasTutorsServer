import { Router } from 'express';
import { ProductController } from './product.controller';
import validator, { ValidationSource } from '../../../helpers/validator';
import authentication from '../../../middleware/authentication';
import authorization from '../../../middleware/authorization';
import schema from './schema'
import { RoleEnum } from '../roles/Role'

export class ProductRoutes {

  readonly router: Router = Router();
  readonly controller: ProductController = new ProductController()

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {

    this.router.get(
      '/:id',
      this.controller.getById
    )

    this.router.get(
      '/',
      this.controller.getAll
    )

    this.router.post(
      '/',
      authentication,
      authorization([RoleEnum.ADMIN]),
      validator(schema.create),
      this.controller.create
    )

    this.router.post(
      '/add/category',
      authentication,
      authorization([RoleEnum.ADMIN]),
      // validator(schema.create),
      this.controller.create
    )


    this.router.put(
      '/:id',
      authentication,
      authorization([RoleEnum.ADMIN]),
      this.controller.update
    )

    this.router.delete(
      '/:id',
      authentication,
      authorization([RoleEnum.ADMIN]),
      this.controller.delete
    )

  }

}
