// import { Request } from "express"
// import File, { FileModel } from './File';
// // import { v2 as cloudinary } from "cloudinary";
// import { BadRequestError } from '../../../core/ApiError';
// import { CloudinaryResponse } from "./interface"

// interface EditorResponse {
//     success: 1,
//     file: { url: string }
// }

// export class FileRepo {

//     public static async create(body: CloudinaryResponse): Promise<{ file: File }> {
//         let file = await FileModel.create(body);
//         return { file };
//     }

// }

import { Request } from "express"
import File, { FileModel } from './File';
// import { v2 as cloudinary } from "cloudinary";
import { BadRequestError } from '../../../core/ApiError';

export class FileRepo {

  public static async create(data: File): Promise<{ file: File }> {
    console.log("datadatadata",data)
    let file = await FileModel.create({ data });
    return { file };
  }

}