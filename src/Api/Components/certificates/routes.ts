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


    // Certifications

    this.router.get(
      '/:_id',
      validator(schema.paramsId, ValidationSource.PARAM),
      this.controller.getById
    )


    this.router.get(
      '/user/certifications',
      authentication,
      this.controller.getUserCertifications
    )

    this.router.get(
      '/user/certifications/:_id',
      authentication,
      this.controller.getUserCertificationById
    )

    this.router.get(
      '/admin/certifications',
      authentication,
      this.controller.getAllCertifications
    )

    this.router.put(
      '/admin/send-certificate/:_id',
      authentication,
      this.controller.sendAssignedCertificate
    )



    this.router.get(
      '/',
      this.controller.getAll
    )

    this.router.get(
      '/:_id',
      validator(schema.paramsId, ValidationSource.PARAM),
      this.controller.getById
    )

    this.router.post(
      '/view',
      // validator(schema.create),
      authentication,
      this.controller.addViewCertificate
    )

    this.router.post(
      '/quiz-answer',
      // validator(schema.create),
      authentication,
      this.controller.addCertificateTestAnswer
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

    //survey
    this.router.put(
      '/test/:_id',
      validator(schema.paramsId, ValidationSource.PARAM),
      this.controller.updateSurveyCertificate
    )

    this.router.get(
      '/test/:_id',
      validator(schema.paramsId, ValidationSource.PARAM),
      this.controller.getByCertificateId
    )

    this.router.put(
      '/:_id',
      validator(schema.paramsId, ValidationSource.PARAM),
      this.controller.update
    )




  }

}
