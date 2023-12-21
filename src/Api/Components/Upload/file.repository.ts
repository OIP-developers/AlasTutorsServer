import { Request } from "express"
import File, { FileModel } from './File';
import { BadRequestError, NoDataError } from '../../../core/ApiError';
import { CloudinaryResponse } from "./interface"

export class FileRepo {

  public static async create(body: CloudinaryResponse): Promise<{ file: File }> {
    const file = await FileModel.create(body);
    return { file };
  }

  public static findAll(query: any): Promise<File[] | null> {
    return FileModel
      .find({ isDeleted: false, ...query })
      .select("-isDeleted -updatedAt")
      .lean<File[]>()
      .exec();
  }

  public static async update(key: string, body: File): Promise<{ file: File | null }> {
    const file = await FileModel.findOneAndUpdate({ key }, body, { new: true, runValidators: true });
    if (!file) throw new NoDataError();
    return { file };
  }

  public static async delete(id: string): Promise<{ file: File | null }> {
    const file = await FileModel.findByIdAndDelete(id);
    if (!file) throw new NoDataError();
    return { file };
  }

}
