import DocumentModal, { IParent, ParentModel } from './parent.entity';
import { NoDataError } from '../../../core/ApiError';

export class Repository {

  public static find(): Promise<DocumentModal[]> {
    return ParentModel
      .find({ isDeleted: false })
      .select("-isDeleted -updatedAt")
      .lean<DocumentModal[]>()
      .exec();
  }

  public static async create(body: IParent): Promise<{ data: DocumentModal }> {
    const data = await ParentModel.create({ ...body } as DocumentModal);
    return { data };
  }

  public static async delete(id: string): Promise<{ data: DocumentModal }> {
    const data = await ParentModel.findByIdAndDelete(id, { new: true });
    if (!data) throw new NoDataError();
    return { data };
  }

  public static async update(id: string, body: DocumentModal): Promise<{ data: any }> {
    const data = await ParentModel.findByIdAndUpdate(id, { ...body } as DocumentModal, { new: true, runValidators: true });
    if (!data) throw new NoDataError();
    return { data };
  }

}
