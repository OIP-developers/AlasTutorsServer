import DocumentModal, { IStudent, StudentModel } from './student.entity';
import { NoDataError } from '../../../core/ApiError';
import { UserModel } from '../../../database/model/User';
import Logger from '../../../core/Logger';

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

  public static async createMany(body: IStudent): Promise<{ data: any }> {
    const data = await StudentModel.insertMany({ ...body } as DocumentModal);
    return { data };
  }

  public static async delete(id: string): Promise<{ data: DocumentModal }> {
    const data = await StudentModel.findByIdAndDelete(id, { new: true });
    if (!data) throw new NoDataError();
    return { data };
  }

  public static async findById(id: string): Promise<{ data: DocumentModal }> {
    const student = await StudentModel.findOne({ userId: id });
    const user = await UserModel.findById(id);
    const data = { student, user } as any
    if (!data) throw new NoDataError();
    return { data };
  }

  public static async update(id: string, body: DocumentModal): Promise<{ data: any }> {
    // Exclude _id field from update operation
    delete body._id;

    // Update user document
    const user = await UserModel.findByIdAndUpdate(id, body, { new: true, runValidators: true });

    // Update student document
    const student = await StudentModel.findOneAndUpdate({ userId: id }, body, { new: true, runValidators: true });
    const data = { student, user } as any
    if (!data) throw new NoDataError();
    return { data };
  }

}
