import { Router } from 'express';
import { CourseController } from './course.controller';
import validator, { ValidationSource } from '../../../helpers/validator';
import authentication from '../../../middleware/authentication';
import authorization from '../../../middleware/authorization';
// import schema from './schema'
import { RoleEnum } from '../roles/Role'
export class CourseRoutes {

  readonly router: Router = Router();
  readonly controller: CourseController = new CourseController()

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
      // authorization([RoleEnum.ADMIN]),
      // validator(schema.create),
      this.controller.create
    )

    // this.router.put(
    //   '/status/:id',
    //   authentication,
    //   authorization([RoleEnum.ADMIN]),
    //   validator(schema.status),
    //   this.controller.statusUpdate
    // )

    this.router.put(
      '/:id',
      // authentication,
      // authorization([RoleEnum.ADMIN]),
      this.controller.update
    )

    this.router.delete(
      '/:id',
      // authentication,
      // authorization([RoleEnum.ADMIN]),
      this.controller.delete
    )

    
    this.router.get(
      '/video/:id',
      this.controller.getVideoById
    )

  }

}
