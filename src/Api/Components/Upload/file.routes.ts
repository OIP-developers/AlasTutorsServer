import { Router } from 'express';
// import validator, { ValidationSource } from '../../../helpers/validator';
// import schema from './schema';
import { FileController } from "./file.controller"
import formidableMiddleware from "express-formidable"
import { CloudinaryResponse } from "./interface"

export class FileRoutes {

  readonly router: Router = Router();
  readonly controller: FileController = new FileController()

  constructor() {
    this.initRoutes();
  }


  initRoutes(): void {

    this.router.use(formidableMiddleware())

    // this.router.post(
    //   '/image',
    //   this.controller.imageUpload
    // )

    // this.router.post(
    //   '/image/editor',
    //   this.controller.imageUploadForEditor
    // )

    // this.router.post(
    //   '/video',
    //   this.controller.videoUpload
    // )

    this.router.get(
      '/',
      this.controller.getAll
    )

    this.router.delete(
      '/:_id',
      this.controller.delete
    )

  }

}
