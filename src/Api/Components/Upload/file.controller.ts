
import { Response, NextFunction } from "express"
import asyncHandler from "../../../helpers/async";
import { SuccessResponse, SuccessMsgResponse } from '../../../core/ApiResponse';
import { BadRequestError } from "../../../core/ApiError";
// import { FileRepo } from "./image.repository"
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryResponse } from "./interface"
import { FileService } from './file.service'
// import { NoDataError, BadRequestError } from '../../../core/ApiError';
// import _ from 'lodash';

export class FileController {

    service: FileService = new FileService()

    uploadOnCloudinary = async (req: any): Promise<CloudinaryResponse> => {
        const fileData: any = req.files;
        cloudinary.config({
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
            let uploadedFile = await cloudinary.uploader.upload(fileData.image.path, options);
            return {
                path: uploadedFile.secure_url,
                fileSize: uploadedFile.bytes,
                fileType: `${uploadedFile.resource_type}/${uploadedFile.format}`,
                fileName: uploadedFile.original_filename
            };
        } catch (error: any) {
            throw new BadRequestError(error.message || "Image Upload Field");
        }

    }

    fileUpload = asyncHandler(
        async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
            const { path, size, type, name }: any = req.files.file;
            const { destPath }: { destPath: string } = req.query;

            const file = await this.service.uploadFileToS3({
                fileName: name,
                filePath: path,
                folderName: destPath
            });
            // const { file } = await FileRepo.create(uploaded);
            new SuccessResponse('Added successfully', { file }).send(res);
        }
    )

    downloadFolder = asyncHandler(
        async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
            // const { path, size, type, name }: any = req.files.file;
            // console.log('====================================');
            // console.log(path);
            // console.log('====================================');
            // const { destPath }: { destPath: string } = req.query;

            await this.service.downloadS3FolderAsZip({
                folderPath: "faizan/",
                zipFilePath: "/home/faizan_ahmed/Code/test.zip"
            });
            // const { file } = await FileRepo.create(uploaded);
            new SuccessResponse('Added successfully', {}).send(res);
        }
    )

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