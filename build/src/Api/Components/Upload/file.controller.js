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
const image_repository_1 = require("./image.repository");
// import { NoDataError, BadRequestError } from '../../../core/ApiError';
// import _ from 'lodash';
class FileController {
    constructor() {
        this.fileService = new file_service_1.FileService();
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
        // fileUpload = asyncHandler(
        //     async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
        //         const { path, size, type, name }: any = req.files.file;
        //         const { destPath }: { destPath: string } = req.query;
        //         const file = await this.service.uploadFileToS3({
        //             fileName: name,
        //             filePath: path,
        //             folderName: destPath
        //         });
        //         // const { file } = await FileRepo.create(uploaded);
        //         new SuccessResponse('Added successfully', { file }).send(res);
        //     }
        // )
        // downloadFolder = asyncHandler(
        //     async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
        //         // const { path, size, type, name }: any = req.files.file;
        //         // console.log('====================================');
        //         // console.log(path);
        //         // console.log('====================================');
        //         // const { destPath }: { destPath: string } = req.query;
        //         await this.service.downloadS3FolderAsZip({
        //             folderPath: "faizan/",
        //             zipFilePath: "/home/faizan_ahmed/Code/test.zip"
        //         });
        //         // const { file } = await FileRepo.create(uploaded);
        //         new SuccessResponse('Added successfully', {}).send(res);
        //     }
        // )
        this.videoUploadToS3 = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const source = yield this.fileService.uploadOnS3({ file: req.files.file });
            //@ts-ignore
            console.log("files Data", source.Location.startsWith('h') ? source.Location : `https://${source.Location}`);
            const { file } = yield image_repository_1.FileRepo.create({
                // @ts-ignore
                // private_source_url: `${source.Location}`,
                private_source_url: source.Location.startsWith('h') ? source.Location : `https://${source.Location}`,
                // @ts-ignore
                // public_source_url: `${source.Location}`,
                public_source_url: source.Location.startsWith('h') ? source.Location : `https://${source.Location}`,
                size: `${req.files.file.size}`,
                dimensions: `0 x 0`,
                length: "jjjjj",
                type: `${req.files.file.type}`,
                folderId: req.query.folderId
            });
            new ApiResponse_1.SuccessResponse('Added successfully', { file }).send(res);
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