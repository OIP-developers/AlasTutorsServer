import DocumentModal, { IStudent, StudentModel } from './invoice.entity';
import { NoDataError } from '../../../core/ApiError';

export class Repository {

  public static find(): Promise<DocumentModal[]> {
    return StudentModel
      .find({ isDeleted: false })
      .select("-isDeleted -updatedAt")
      .lean<DocumentModal[]>()
      .exec();
  }

  public static async create(body: IStudent): Promise<{ data: DocumentModal }> {
    const data = await StudentModel.create({ ...body } as DocumentModal);
    return { data };
  }

  public static async delete(id: string): Promise<{ data: DocumentModal }> {
    const data = await StudentModel.findByIdAndDelete(id, { new: true });
    if (!data) throw new NoDataError();
    return { data };
  }

  public static async update(id: string, body: DocumentModal): Promise<{ data: any }> {
    const data = await StudentModel.findByIdAndUpdate(id, { ...body } as DocumentModal, { new: true, runValidators: true });
    if (!data) throw new NoDataError();
    return { data };
  }

}
