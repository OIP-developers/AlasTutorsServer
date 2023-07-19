"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = void 0;
const async_1 = __importDefault(require("../../../helpers/async"));
const ApiResponse_1 = require("../../../core/ApiResponse");
const ApiError_1 = require("../../../core/ApiError");
// import { FileRepo } from "./image.repository"
const cloudinary_1 = require("cloudinary");
const file_service_1 = require("./file.service");
// import { NoDataError, BadRequestError } from '../../../core/ApiError';
// import _ from 'lodash';
class FileController {
    constructor() {
        this.service = new file_service_1.FileService();
        this.uploadOnCloudinary = (req) => __awaiter(this, void 0, void 0, function* () {
            const fileData = req.files;
            cloudinary_1.v2.config({
                cloud_name: 'dairwfrpv',
                api_key: '759452217818743',
                api_secret: 'EhXhgDvwK_vZbmhFVjgpeErMfvc'
            });
            const options = {
                use_filename: true,
                unique_filename: false,
                overwrite: true
            };
            try {
                let uploadedFile = yield cloudinary_1.v2.uploader.upload(fileData.image.path, options);
                return {
                    path: uploadedFile.secure_url,
                    fileSize: uploadedFile.bytes,
                    fileType: `${uploadedFile.resource_type}/${uploadedFile.format}`,
                    fileName: uploadedFile.original_filename
                };
            }
            catch (error) {
                throw new ApiError_1.BadRequestError(error.message || "Image Upload Field");
            }
        });
        this.fileUpload = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { path, size, type, name } = req.files.file;
            const { destPath } = req.query;
            const file = yield this.service.uploadFileToS3({
                fileName: name,
                filePath: path,
                folderName: destPath
            });
            // const { file } = await FileRepo.create(uploaded);
            new ApiResponse_1.SuccessResponse('Added successfully', { file }).send(res);
        }));
        this.downloadFolder = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            // const { path, size, type, name }: any = req.files.file;
            // console.log('====================================');
            // console.log(path);
            // console.log('====================================');
            // const { destPath }: { destPath: string } = req.query;
            yield this.service.downloadS3FolderAsZip({
                folderPath: "faizan/",
                zipFilePath: "/home/faizan_ahmed/Code/test.zip"
            });
            // const { file } = await FileRepo.create(uploaded);
            new ApiResponse_1.SuccessResponse('Added successfully', {}).send(res);
        }));
        // imageUpload = asyncHandler(
        //     async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
        //         const uploaded: CloudinaryResponse = await this.uploadOnCloudinary(req)
        //         const { file } = await FileRepo.create(uploaded);
        //         new SuccessResponse('Added successfully', file).send(res);
        //     }
        // )
        // imageUploadForEditor = asyncHandler(
        //     async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
        //         const uploaded: CloudinaryResponse = await this.uploadOnCloudinary(req)
        //         const { file } = await FileRepo.create(uploaded);
        //         res.send({
        //             success: 1,
        //             file: {
        //                 url: file.path,
        //             }
        //         });
        //     }
        // )
        // name = asyncHandler(
        //     async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
        //     }
        // )
    }
}
exports.FileController = FileController;
//# sourceMappingURL=file.controller.js.map