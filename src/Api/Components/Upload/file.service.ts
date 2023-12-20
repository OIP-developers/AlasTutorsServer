
// require('aws-sdk/lib/maintenance_mode_message').suppress = true;
import { BadRequestError } from '../../../core/ApiError';
import { Storage } from "@google-cloud/storage"
import { google_storage } from "../../../config/globals"
import AWS from 'aws-sdk';
import fs from "fs"
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

export enum PRODUCT {
  PREMIUM_VIP = "PREMIUM_VIP",
  MASTER_CLASS = "MASTER_CLASS",
}

export class FileService {

  coursesBucketName = "courses-culturefy"
  coursesBucketUrl = "https://courses-culturefy.nyc3.digitaloceanspaces.com"

  workspaceBucketName = "culturefy-workspaces"
  workspaceBucketUrl = "https://culturefy-workspaces.nyc3.digitaloceanspaces.com"


  s3 = new AWS.S3({
    endpoint: 'nyc3.digitaloceanspaces.com',
    accessKeyId: 'DO009HL2CZ2V6WMGBUHC',
    secretAccessKey: 'C8YgHm7BLtInwTtj4ujKj4dIOARGTDVoWczpRPkpy1E'
  });

  readonly storage: Storage = new Storage({
    keyFilename: google_storage.keyFilename,
    projectId: google_storage.projectId
  });
  readonly bucketName: string = google_storage.bucketName;
  readonly generationMatchPrecondition: number = 0;

  async getBuckets() {
    return this.storage.getBuckets();
  }

  async uploadFile({ filePath, destFileName }: { filePath: string, destFileName: string }) {
    const options = {
      destination: destFileName,
      // Optional:
      // Set a generation-match precondition to avoid potential race conditions
      // and data corruptions. The request to upload is aborted if the object's
      // generation number does not match your precondition. For a destination
      // object that does not yet exist, set the ifGenerationMatch precondition to 0
      // If the destination object already exists in your bucket, set instead a
      // generation-match precondition using its generation number.
      preconditionOpts: { ifGenerationMatch: this.generationMatchPrecondition },
    };
    return this.storage.bucket(this.bucketName).upload(filePath, options);
  }

  async fileUploader(file: any, bucketName: string, bucketUrl: string, destination: string) {

    console.log(file , "file")

    const fileModified = uuidv4() + "-" + file.name.trim().replaceAll(' ', '-')
    const destinationModified = destination.trim().toLowerCase().replaceAll(' ', '-')

    console.log(file.name, "name")
    console.log(file.size, "size")
    console.log(path.extname(file.name), "type")
    console.log(destinationModified, "destinationModified")


    const params = {
      Body: fs.createReadStream(file.path),
      Bucket: bucketName,
      Key: `${destinationModified}${fileModified}`
    };
    // Sending the file to the Spaces
    const url = await new Promise((res, rej) => {
      this.s3.putObject(params)
        .on('build', (request: any) => {
          request.httpRequest.headers.Host = bucketUrl;
          request.httpRequest.headers['Content-Length'] = file.size;
          request.httpRequest.headers['Content-Type'] = file.type;
          request.httpRequest.headers['x-amz-acl'] = 'public-read';
        })
        .send((err: any) => {
          if (err) rej(err);
          else {
            const imageUrl = `${bucketUrl}/${destinationModified}` + fileModified
            res(imageUrl)
          }
        });
    })

    if (destination) {
      return { name: file.name, size: file.size, type: path.extname(file.name), url: url }
    }

    return url

  }

  async uploadFileToS3({ file }: { file: any }) {
    return await this.fileUploader(file, this.coursesBucketName, this.coursesBucketUrl, "")
  }

  async uploadWorkspaceFileToS3({ file, destination }: { file: any, destination: string }) {
    return await this.fileUploader(file, this.workspaceBucketName, this.workspaceBucketUrl, destination)
  }

}
