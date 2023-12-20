
import { Response, Request, NextFunction } from "express"
import asyncHandler from "../../../helpers/async";
import { SuccessResponse, SuccessMsgResponse } from '../../../core/ApiResponse';
import { BadRequestError } from "../../../core/ApiError";
import { FileRepo } from "./file.repository"
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryResponse } from "./interface"
import { FileService } from "./file.service"
// import { NoDataError, BadRequestError } from '../../../core/ApiError';
// import _ from 'lodash';

export class FileController {

  private fileService: FileService = new FileService()

  // uploadOnCloudinary = async (req: any): Promise<CloudinaryResponse> => {
  //   const fileData: any = req.files;
  //   cloudinary.config({
  //     cloud_name: 'dairwfrpv',
  //     api_key: '759452217818743',
  //     api_secret: 'EhXhgDvwK_vZbmhFVjgpeErMfvc'
  //   });
  //   const options = {
  //     use_filename: true,
  //     unique_filename: false,
  //     overwrite: true
  //   };
  //   try {
  //     let uploadedFile = await cloudinary.uploader.upload(fileData.image.path, options);
  //     return {
  //       path: uploadedFile.secure_url,
  //       fileSize: uploadedFile.bytes,
  //       fileType: `${uploadedFile.resource_type}/${uploadedFile.format}`,
  //       fileName: uploadedFile.original_filename
  //     };
  //   } catch (error: any) {
  //     throw new BadRequestError(error.message || "Image Upload Field");
  //   }
  // }

  // imageUpload = asyncHandler(
  //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
  //     const uploaded: CloudinaryResponse = await this.uploadOnCloudinary(req)
  //     const { file } = await FileRepo.create(uploaded);
  //     new SuccessResponse('Added successfully', file).send(res);
  //   }
  // )

  // imageUploadForEditor = asyncHandler(
  //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
  //     const uploaded: CloudinaryResponse = await this.uploadOnCloudinary(req)
  //     const { file } = await FileRepo.create(uploaded);
  //     res.send({
  //       success: 1,
  //       file: {
  //         url: file.path,
  //       }
  //     });
  //   }
  // )

  videoUpload = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const cloudFile = await this.fileService.uploadFile({ destFileName: req.files.file.name, filePath: req.files.file.path })
      const { file } = await FileRepo.create({
        fileName: cloudFile[0].metadata.name,
        fileSize: cloudFile[0].metadata.size,
        fileType: cloudFile[0].metadata.contentType,
        path: cloudFile[0].metadata.selfLink
      });
      new SuccessResponse('Added successfully', { file }).send(res);
    }
  )

  videoUploadToS3 = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const source = await this.fileService.uploadFileToS3({ file: req.files.file })
      new SuccessResponse('Added successfully', { source }).send(res);
    }
  )

  workspaceUploadToS3 = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const file = await this.fileService.uploadWorkspaceFileToS3({ file: req.files.file  , destination : req.query.destination})
      new SuccessResponse('Upload successful', { file }).send(res);
    }
  )

  getAll = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      const files = await FileRepo.findAll(req.query)
      new SuccessResponse('get successfully', files).send(res);
    }
  )

  delete = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      const { file } = await FileRepo.delete(req.params._id)
      new SuccessResponse('delete successfully', file).send(res);
    }
  )

}