import DocumentModal, { ITeacher, TeacherModel } from './teacher.entity';
import { NoDataError } from '../../../core/ApiError';

export class Repository {

  public static find(): Promise<DocumentModal[]> {
    return TeacherModel
      .find({ isDeleted: false })
      .select("-isDeleted -updatedAt")
      .lean<DocumentModal[]>()
      .exec();
  }

  public static async create(body: ITeacher): Promise<{ data: DocumentModal }> {
    const data = await TeacherModel.create({ ...body } as DocumentModal);
    return { data };
  }

  public static async delete(id: string): Promise<{ data: DocumentModal }> {
    const data = await TeacherModel.findByIdAndDelete(id, { new: true });
    if (!data) throw new NoDataError();
    return { data };
  }

  public static async update(id: string, body: DocumentModal): Promise<{ data: any }> {
    const data = await TeacherModel.findByIdAndUpdate(id, { ...body } as DocumentModal, { new: true, runValidators: true });
    if (!data) throw new NoDataError();
    return { data };
  }

}
