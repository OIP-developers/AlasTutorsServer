import { Router } from 'express';
import { RecommendationController } from './Recommendation.controller';
// import validator, { ValidationSource } from '../../../helpers/validator';
import authentication from '../../../middleware/authentication';
// import schema from "./schema"

export class Routes {

  readonly router: Router = Router();
  readonly controller: RecommendationController = new RecommendationController()

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {

    this.router.get(
      '/',
      // authentication,
      this.controller.getAll
    )

    this.router.get(
      '/:_id',
      // authentication,
      this.controller.getById
    )

    this.router.post(
      '/',
      // authentication,
      // validator(schema.create),
      this.controller.add
    )

    this.router.get(
      '/find/goal',
      authentication,
      // validator(schema.create),
      this.controller.findWithGoal
    )
    // this.router.get(
    //   '/find/work',
    //   authentication,
    //   // validator(schema.create),
    //   this.controller.findWithWork
    // )

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
