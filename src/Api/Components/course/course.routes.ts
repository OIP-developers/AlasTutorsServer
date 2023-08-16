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

    this.router.use(
      '/views',
      this.controller.getVideoById
    )

    this.router.get(
      '/public',
      this.controller.getPublicCourses
    )
    this.router.get(
      '/public/:id',
      // authentication,
      this.controller.getByPublicId
    )

    this.router.get(
      '/:id',
      authentication,
      this.controller.getById
    )

    this.router.get(
      '/',
      authentication,
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


    this.router.post(
      '/review',
      authentication,
      this.controller.createReview
    )
    this.router.put(
      '/review/:id',
      // authentication,
      this.controller.updateReview
    )
    this.router.get(
      '/review/:id',
      // authentication,
      this.controller.getCourseReviewById
    )


    // this.router.get(
    //   '/public/course',
    //   // authentication,
    //   this.controller.getCoureByCategoryId
    // )
    this.router.delete(
      '/review/:id',
      // authentication,
      this.controller.deleteCourseReview
    )
    this.router.get(
      '/review/getall/:id',
      // authentication,
      this.controller.getAllCourseReviewByCourseId
    )



    this.router.get(
      '/video/:id',
      this.controller.getVideoById
    )

  }

}
