import Business, { BusinessModal, IBusiness } from './business';
import { NoDataError } from '../../../core/ApiError';
import { Schema } from 'mongoose';

export default class BusinessRepo {

  public static find(): Promise<Business[]> {
    return BusinessModal
      .find({ isDeleted: false })
      .select("-isDeleted -updatedAt")
      .lean<Business[]>()
      .exec();
  }

  public static findById(id: Schema.Types.ObjectId): Promise<Business[]> {
    return BusinessModal
      .findById(id, { isDeleted: false })
      .select("-isDeleted -updatedAt")
      .lean<Business[]>()
      .exec();
  }


  public static async create(body: IBusiness): Promise<{ settingData: Business }> {
    const settingData = await BusinessModal.create({ ...body } as Business);
    return { settingData };
  }

  public static async delete(id: string): Promise<{ settingData: any }> {
    const settingData = await BusinessModal.findByIdAndDelete(id);
    if (!settingData) throw new NoDataError();
    return { settingData };
  }

  public static async updateBusiness(id: string, body: Business): Promise<{ settingData: any }> {
    const settingData = await BusinessModal.findByIdAndUpdate(id, { ...body } as Business, { new: true });
    if (!settingData) throw new NoDataError();
    return { settingData };
  }

}
