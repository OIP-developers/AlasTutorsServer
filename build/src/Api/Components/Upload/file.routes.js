"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRoutes = void 0;
const express_1 = require("express");
// import validator, { ValidationSource } from '../../../helpers/validator';
// import schema from './schema';
const file_controller_1 = require("./file.controller");
const express_formidable_1 = __importDefault(require("express-formidable"));
class FileRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new file_controller_1.FileController();
        this.initRoutes();
    }
    initRoutes() {
        this.router.use((0, express_formidable_1.default)());
        this.router.post('/', this.controller.fileUpload);
        this.router.get('/', this.controller.downloadFolder);
        // this.router.post(
        //   '/image',
        //   this.controller.imageUpload
        // )
        // this.router.post(
        //   '/image/editor',
        //   this.controller.imageUploadForEditor
        // )
    }
}
exports.FileRoutes = FileRoutes;
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
//# sourceMappingURL=file.routes.js.map