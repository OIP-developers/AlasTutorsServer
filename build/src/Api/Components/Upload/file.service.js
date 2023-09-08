"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const ApiError_1 = require("../../../core/ApiError");
// import { FileRepo } from "./image.repository"
const cloudinary_1 = require("cloudinary");
// import { CloudinaryResponse } from "./interface"
// import { NoDataError, BadRequestError } from '../../../core/ApiError';
// import _ from 'lodash';
const client_s3_1 = require("@aws-sdk/client-s3");
const fs = __importStar(require("fs"));
// import fs from 'fs';
// import aws from 'aws-sdk'
const uuid_1 = require("uuid");
const lib_storage_1 = require("@aws-sdk/lib-storage");
// import { Readable } from "stream";
// import { S3Client } from "@aws-sdk/client-s3";
class FileService {
    constructor() {
        // private folderName = 'folder-name';
        // private fileName = 'your-file-name';
        // private filePath = 'path-to-your-file';
        this.region = 'ap-southeast-1';
        this.bucketName = 'elect-space';
        // private folderName = 'folder-name';
        // private fileName = 'your-file-name';
        // private filePath = 'path-to-your-file';
        // S3 Account Keys
        this.accessKeyId = 'DO00MURUA6LCEBJHDPGX';
        this.secretAccessKey = 'aKJ2TZhAUr6lss3BuYk6tbaKjrnG971WXuBvAmk5T3M';
        // s3Client: AWS.S3Client = new S3Client({
        //   region: "us-east-2",
        //   credentials: {
        //     accessKeyId: "DO00MURUA6LCEBJHDPGX",
        //     secretAccessKey: "aKJ2TZhAUr6lss3BuYk6tbaKjrnG971WXuBvAmk5T3M",
        //   },
        // });
        this.s3Client = new client_s3_1.S3({
            forcePathStyle: false,
            endpoint: "https://sgp1.digitaloceanspaces.com",
            region: this.region,
            credentials: {
                accessKeyId: this.accessKeyId,
                secretAccessKey: this.secretAccessKey,
            }
        });
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
    }
    // public uploadFileToS3 = async ({ filePath, fileName, folderName }: { filePath: string, folderName: string, fileName: string }) => {
    //     const fileSize = fs.statSync(filePath).size;
    //     const multipartUploadThreshold = 5 * 1024 * 1024; // 5 MB
    //     const partSize = 5 * 1024 * 1024; // 5 MB
    //     const numberOfParts = Math.ceil(fileSize / partSize);
    //     const objectKey = `${folderName}/${fileName}`;
    //     console.log("CHEKJAHDKLJVADLKFH")
    //     const createMultipartUploadCommand = new CreateMultipartUploadCommand({
    //         Bucket: this.bucketName,
    //         Key: objectKey
    //     });
    //     const { UploadId } = await this.s3.send(createMultipartUploadCommand);
    //     const parts = [];
    //     let start = 0;
    //     for (let i = 1; i <= numberOfParts; i++) {
    //         const end = Math.min(start + partSize, fileSize);
    //         const partParams = {
    //             Bucket: this.bucketName,
    //             Key: objectKey,
    //             PartNumber: i,
    //             UploadId,
    //             Body: fs.createReadStream(filePath, { start, end: end - 1 }),
    //             ContentLength: end - start
    //         };
    //         const uploadPartCommand = new UploadPartCommand(partParams);
    //         const { ETag } = await this.s3.send(uploadPartCommand);
    //         parts.push({ PartNumber: i, ETag });
    //         start = end;
    //     }
    //     const completeMultipartUploadParams = {
    //         Bucket: this.bucketName,
    //         Key: objectKey,
    //         UploadId,
    //         MultipartUpload: {
    //             Parts: parts
    //         }
    //     };
    //     const completeMultipartUploadCommand = new CompleteMultipartUploadCommand(completeMultipartUploadParams);
    //     const { Location, Key } = await this.s3.send(completeMultipartUploadCommand);
    //     return { location: Location, key: Key }
    // }
    // getFolderSize = async (folderPath: string): Promise<number> => {
    //     let size = 0;
    //     let isTruncated = true;
    //     let continuationToken = undefined;
    //     while (isTruncated) {
    //         const response = await this.s3.send(new ListObjectsV2Command({
    //             Bucket: this.bucketName,
    //             Prefix: folderPath,
    //             ContinuationToken: continuationToken
    //         }));
    //         const objects = response.Contents;
    //         objects && (size += objects.reduce((acc, object) => acc + Number(object.Size), 0)); // object.Size
    //         (typeof response.IsTruncated === 'boolean') && (isTruncated = response.IsTruncated);
    //         // continuationToken = response.NextContinuationToken;
    //         // continuationToken = "ddddd" // response.NextContinuationToken
    //     }
    //     return size;
    // }
    // downloadS3FolderAsZip = async ({ folderPath, zipFilePath }: { folderPath: string, zipFilePath: string }) => {
    //     const zipStream = fs.createWriteStream(zipFilePath);
    //     const archive = archiver("zip");
    //     archive.pipe(zipStream);
    //     const objectsToDownload = await this.getObjectsInFolder(this.bucketName, folderPath);
    //     for (const key of objectsToDownload) {
    //         const getObjectCommand = new GetObjectCommand({ Bucket: this.bucketName, Key: key });
    //         const getObjectResponse = await this.s3.send(getObjectCommand);
    //         // @ts-ignore
    //         archive.append(getObjectResponse.Body, { name: key });
    //     }
    //     await archive.finalize().then(() => {
    //         console.log(`Downloaded S3 bucket folder ${folderPath} as zip file to ${zipFilePath}`);
    //     });
    // }
    // public getObjectsInFolder = async (bucketName: string, folderPath: string): Promise<string[]> => {
    //     const listObjectsCommand = new ListObjectsCommand({ Bucket: bucketName, Prefix: folderPath });
    //     const listObjectsResponse = await this.s3.send(listObjectsCommand);
    //     const objects = listObjectsResponse.Contents?.map((obj) => obj.Key!);
    //     return objects?.filter((key) => !key.endsWith("/")) ?? [];
    // }
    // downloadS3Folder = async ({ folderPath, localPath }: { folderPath: string, localPath: string }) => {
    //     const listObjectsCommand = new ListObjectsCommand({ Bucket: this.bucketName, Prefix: folderPath });
    //     const listObjectsResponse = await this.s3.send(listObjectsCommand);
    //     const objectsToDownload = listObjectsResponse.Contents?.map((obj) => obj.Key!).filter((key) => !key.endsWith("/"));
    //     if (!objectsToDownload || objectsToDownload.length === 0) {
    //         console.log(`No objects found in S3 bucket folder: ${folderPath}`);
    //         return;
    //     }
    //     for (const key of objectsToDownload) {
    //         const getObjectCommand = new GetObjectCommand({ Bucket: this.bucketName, Key: key });
    //         const getObjectResponse = await this.s3.send(getObjectCommand);
    //         const localFilePath = `${localPath}/${key}`;
    //         console.log('====================================');
    //         console.log(localFilePath);
    //         console.log('====================================');
    //         const writeStream = fs.createWriteStream(localFilePath);
    //         // @ts-ignore
    //         getObjectResponse?.Body?.pipe(writeStream);
    //         await new Promise((resolve, reject) => {
    //             writeStream.on("finish", resolve);
    //             writeStream.on("error", reject);
    //         });
    //         console.log(`Downloaded object from S3 bucket: s3://${this.bucketName}/${key} -> ${localFilePath}`);
    //     }
    // }
    // downloadFolder = async (folderPath: string, downloadPath: string) => {
    //     // List all objects in the specified folder path
    //     const listParams = {
    //         Bucket: this.bucketName,
    //         Prefix: folderPath,
    //     };
    //     const listObjectsResponse = await this.s3.send(new ListObjectsV2Command(listParams));
    //     const objectList = listObjectsResponse.Contents;
    //     // Download each object to the local file system
    //     if (objectList) {
    //         for (const object of objectList) {
    //             const getObjectParams = {
    //                 Bucket: this.bucketName,
    //                 Key: object.Key,
    //             };
    //             const getObjectResponse = await this.s3.send(new GetObjectCommand(getObjectParams));
    //             const writeStream = fs.createWriteStream(`${downloadPath}/${object.Key}`);
    //             // Create a ReadableStreamDefaultReader to consume the S3 object data
    //             const reader = getObjectResponse.Body?.getReader();
    //             if (!reader) {
    //                 throw new Error("Failed to create stream reader");
    //             }
    //             try {
    //                 while (true) {
    //                     // Read the next chunk of data from the stream
    //                     const { done, value } = await reader.read();
    //                     if (done) {
    //                         break;
    //                     }
    //                     // Write the chunk to the local file stream
    //                     if (value) {
    //                         const buffer = Buffer.from(value.buffer);
    //                         writeStream.write(buffer);
    //                     }
    //                 }
    //             } finally {
    //                 // Close the local file stream and release the reader resources
    //                 writeStream.end();
    //                 reader.releaseLock();
    //             }
    //             // Read the object data into a Buffer and write it to a local file stream
    //             // await new Promise<void>((resolve, reject) => {
    //             //     const chunks: any[] = [];
    //             //     getObjectResponse.Body?.on("data", (chunk) => chunks.push(chunk));
    //             //     getObjectResponse.Body?.on("end", () => {
    //             //         const buffer = Buffer.concat(chunks);
    //             //         writeStream.write(buffer, (error) => {
    //             //             if (error) {
    //             //                 reject(error);
    //             //             } else {
    //             //                 resolve();
    //             //             }
    //             //         });
    //             //     });
    //             //     getObjectResponse.Body?.on("error", reject);
    //             // });
    //         }
    //     } else {
    //         throw new BadRequestError(`downloading failed`)
    //     }
    //     console.log("Folder downloaded successfully!");
    // }
    // name = asyncHandler(
    //     async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
    //     }
    // )
    uploadOnS3({ file }) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("file.path", file);
            const fileStream = fs.createReadStream(file.path);
            const fileModified = (0, uuid_1.v4)() + file.name.trim().replaceAll(' ', '-');
            console.log(fileModified);
            const upload = new lib_storage_1.Upload({
                client: this.s3Client,
                params: {
                    Bucket: this.bucketName,
                    Key: `${fileModified}`,
                    Body: fileStream,
                    BucketKeyEnabled: true,
                    ACL: 'public-read',
                },
            });
            const result = yield upload.done();
            return result;
        });
    }
}
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map