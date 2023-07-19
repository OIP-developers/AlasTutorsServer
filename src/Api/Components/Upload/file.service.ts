
import { BadRequestError } from "../../../core/ApiError";
// import { FileRepo } from "./image.repository"
import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryResponse } from "./interface"
// import { NoDataError, BadRequestError } from '../../../core/ApiError';
// import _ from 'lodash';
import {
    S3Client,
    PutObjectCommand,
    CreateMultipartUploadCommand,
    UploadPartCommand,
    CompleteMultipartUploadCommand,
    ListObjectsV2Command,
    GetObjectCommand,
    ListObjectsCommand,
} from '@aws-sdk/client-s3';
import archiver from "archiver";
import * as fs from 'fs';
import * as path from "path";
import { promisify } from "util";
import { Readable } from "stream";
import * as AWS from "@aws-sdk/client-s3";
// import fs from 'fs';
// import aws from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid';
import { Upload } from "@aws-sdk/lib-storage";
// import { Readable } from "stream";
// import { S3Client } from "@aws-sdk/client-s3";

export class FileService {

    private region = 'us-east-1'
    private bucketName = 'elect-space';

    // private folderName = 'folder-name';
    // private fileName = 'your-file-name';
    // private filePath = 'path-to-your-file';

    // S3 Account Keys
    private accessKeyId = 'DO00MURUA6LCEBJHDPGX';
    private secretAccessKey = 'aKJ2TZhAUr6lss3BuYk6tbaKjrnG971WXuBvAmk5T3M';

     
  s3Client: AWS.S3Client = new S3Client({
    region: "us-east-2",
    credentials: {
      accessKeyId: "AKIAQL55CZLWSF7X4RGA",
      secretAccessKey: "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",
    },
  });

    uploadOnCloudinary = async (req: any): Promise<any> => {
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

    public async uploadOnS3({ file }: { file: any }) {
      console.log("file.path",file)
      const fileStream = fs.createReadStream(file.path);
      const fileModified = uuidv4() + file.name.trim().replaceAll(' ', '-')
      console.log(fileModified);
      
      const upload = new Upload({
        client: this.s3Client,
        params: {
          Bucket: "static-files-lms",
          Key: `${fileModified}`,
          Body: fileStream,
        },
      });
  
      const result = await upload.done();
      return result
    }
  

}