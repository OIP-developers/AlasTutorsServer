import { Router } from 'express';
// import validator, { ValidationSource } from '../../../helpers/validator';
// import schema from './schema';
import { FileController } from "./file.controller"
import formidableMiddleware from "express-formidable"

export class FileRoutes {

  readonly router: Router = Router();
  readonly controller: FileController = new FileController()

  constructor() {
    this.initRoutes();
  }


  initRoutes(): void {

    this.router.use(formidableMiddleware())

    // this.router.post(
    //   '/',
    //   this.controller.fileUpload
    // )

    // this.router.get(
    //   '/',
    //   this.controller.downloadFolder
    // )

    // this.router.post(
    //   '/image',
    //   this.controller.imageUpload
    // )

    // this.router.post(
    //   '/image/editor',
    //   this.controller.imageUploadForEditor
    // )
    this.router.post(
      '/',
      this.controller.videoUploadToS3
    )


    

  }

}

// router.get(
//   '/',
//   asyncHandler(async (req, res, next) => {
//     const buckets = await BucketRepo.find();
//     if (!buckets) throw new NoDataError();
//     new SuccessResponse('fetch successfully', buckets).send(res);
//   }),
// )

// router.get(
//   '/:key',
//   validator(schema.keyId,  ValidationSource.PARAM),
//   asyncHandler(async (req, res, next) => {
//     const bucket = await BucketRepo.findforKey(req.params.key);
//     if (!bucket) throw new NoDataError();
//     new SuccessResponse('fetch successfully', bucket).send(res);
//   }),
// )