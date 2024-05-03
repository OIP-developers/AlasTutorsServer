import DocumentModal, { ITeacher, TeacherModel } from './teacher.entity';
import { NoDataError } from '../../../core/ApiError';
import { UserModel } from '../../../database/model/User';

export class Repository {

  public static find(): Promise<DocumentModal[]> {
    return TeacherModel
      .find({ isDeleted: false })
      .select("-isDeleted -updatedAt")
      .lean<DocumentModal[]>()
      .exec();
  }

  public static async findById(id: string): Promise<{ data: DocumentModal }> {
    const teacher = await TeacherModel.findOne({ userId: id });
    const user = await UserModel.findById(id);
    const data = { teacher, user } as any
    if (!data) throw new NoDataError();
    return { data };
  }

  public static async create(body: ITeacher): Promise<{ data: DocumentModal }> {
    const data = await TeacherModel.create({ ...body } as DocumentModal);
    return { data };
  }

  public static async delete(id: string): Promise<{ data: DocumentModal }> {
    const data = await TeacherModel.findOneAndDelete({userId:id}, { new: true });
    if (!data) throw new NoDataError();
    return { data };
  }

  public static async update(id: string, body: DocumentModal): Promise<{ data: any }> {
    delete body._id;
    // Update user document
    const user = await UserModel.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    const teacher = await TeacherModel.findOneAndUpdate({userId:id}, { ...body } as DocumentModal, { new: true, runValidators: true });
    const data = { teacher, user } as any
    if (!data) throw new NoDataError();
    return { data };
  }

}
