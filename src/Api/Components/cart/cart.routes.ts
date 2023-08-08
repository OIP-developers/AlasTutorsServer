import { Router } from 'express';
import { CartController } from './cart.controller';
import validator, { ValidationSource } from '../../../helpers/validator';
// import authorization from "../../../middlewares/authorization";
// import authentication from "../../../middlewares/authentication";
import schema from './schema'
import { RoleEnum } from '../roles/Role'
import authentication from '../../../middleware/authentication';
export class CartRoutes {

  readonly router: Router = Router();
  readonly controller: CartController = new CartController()

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {

    this.router.get(
      '/my',
      authentication,
      this.controller.getByUser
    )

    this.router.get(
      '/:id',
      this.controller.getById
    )

    // this.router.get(
    //   '/',
    //   this.controller.getAll
    // )

    this.router.post(
      '/',
      authentication,
      // authorization(["USER"]),
      // validator(schema.create),
      this.controller.create
    )

    this.router.put(
      '/:id',
      authentication,
      // authorization(["USER"]),
      validator(schema.create),
      this.controller.update
    )

    this.router.delete(
      '/:id',
      authentication,
      // authorization(["USER"]),
      this.controller.delete
    )

  }

}
