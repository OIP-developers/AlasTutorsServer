
import { BadRequestError } from '../../../core/ApiError';
import { Storage } from "@google-cloud/storage"
import { google_storage } from "../../../config/globals"

export enum PRODUCT {
  PREMIUM_VIP = "PREMIUM_VIP",
  MASTER_CLASS = "MASTER_CLASS",
}

export class FileService {

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

}
