import DocumentModal, { IParent, ParentModel } from './parent.entity';
import { NoDataError } from '../../../core/ApiError';
import { UserModel } from '../../../database/model/User';

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

  public static async findById(id: string): Promise<{ data: DocumentModal }> {
    const student = await ParentModel.findOne({ userId: id });
    const user = await UserModel.findById(id);
    const data = { student, user } as any
    if (!data) throw new NoDataError();
    return { data };
  }

  public static async delete(id: string): Promise<{ data: DocumentModal }> {
    const data = await ParentModel.findByIdAndDelete(id, { new: true });
    if (!data) throw new NoDataError();
    return { data };
  }

  public static async update(id: string, body: DocumentModal): Promise<{ data: any }> {
    // Exclude _id field from update operation
    delete body._id;

    // Update user document
    const user = await UserModel.findByIdAndUpdate(id, body, { new: true, runValidators: true });

    // Upda
    const parent = await ParentModel.findOneAndUpdate({userId:id}, { ...body } as DocumentModal, { new: true, runValidators: true });
    const data = { parent, user } as any
    if (!data) throw new NoDataError();
    return { data };
  }

}
