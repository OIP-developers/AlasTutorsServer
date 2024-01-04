import DocumentModal, { IReferral, ReferralModel } from './referral.entity';
import { NoDataError } from '../../../core/ApiError';

export class Repository {

  public static find(): Promise<DocumentModal[]> {
    return ReferralModel
      .find({ isDeleted: false })
      .select("-isDeleted -updatedAt")
      .lean<DocumentModal[]>()
      .exec();
  }

  public static findOne(query: any): Promise<DocumentModal> {
    return ReferralModel
      .findOne({ ...query })
      .select("-isDeleted -updatedAt")
      .lean<DocumentModal>()
      .exec();
  }

  public static async create(body: IReferral): Promise<{ data: DocumentModal }> {
    const data = await ReferralModel.create({ ...body } as DocumentModal);
    return { data };
  }

  public static async createMany(body: IReferral): Promise<{ data: any }> {
    const data = await ReferralModel.insertMany({ ...body } as DocumentModal);
    return { data };
  }

  public static async delete(id: string): Promise<{ data: DocumentModal }> {
    const data = await ReferralModel.findByIdAndDelete(id, { new: true });
    if (!data) throw new NoDataError();
    return { data };
  }

  public static async update(id: string, body: DocumentModal): Promise<{ data: any }> {
    const data = await ReferralModel.findByIdAndUpdate(id, { ...body } as DocumentModal, { new: true, runValidators: true });
    if (!data) throw new NoDataError();
    return { data };
  }

  public static async updateByCode(query: any, body: any): Promise<{ data: any }> {
    const data = await ReferralModel.findOneAndUpdate({ ...query } as any, body, { new: true, runValidators: true });
    if (!data) throw new NoDataError();
    return { data };
  }

}
