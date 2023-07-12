import { Router } from 'express';
// import { CourseController } from './course.controller';
import validator, { ValidationSource } from '../../../helpers/validator';
import authentication from '../../../middleware/authentication';
import authorization from '../../../middleware/authorization';
// import schema from './schema'
import { RoleEnum } from '../roles/Role'
import { CourseCategoryController } from './course-category.controller';
import {SubCourseCategoryController} from './sub-course-category/sub-course-category.controller'
export class CourseCategoryRoutes {

  readonly router: Router = Router();
  readonly controller:CourseCategoryController = new CourseCategoryController()
  readonly subController:SubCourseCategoryController =new SubCourseCategoryController()

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
   this.router.get(
      '/sub-category',
      this.subController.getAll
    )
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
      // authentication,
      // authorization([RoleEnum.ADMIN]),
      // validator(schema.create),
      this.controller.create
    )
    this.router.post(
      '/',
      // authentication,
      // authorization([RoleEnum.ADMIN]),
      // validator(schema.create),
      this.controller.create
    )

    this.router.post(
      '/sub-category',
      // authentication,
      // authorization([RoleEnum.ADMIN]),
      // validator(schema.create),
      this.subController.create
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
 
    this.router.delete(
      '/sub-category/:id',
      // authentication,
      // authorization([RoleEnum.ADMIN]),
      this.subController.delete
    )
  

 

  }

}
