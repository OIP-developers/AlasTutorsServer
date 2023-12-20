import AdminSetting, { AdminSettingModel } from './adminSetting';
import { NoDataError } from '../../../core/ApiError';
import { Schema } from 'mongoose';

export default class AdminSettingRepo {

  public static find(): Promise<AdminSetting[]> {
    return AdminSettingModel
      .find({ isDeleted: false })
      .select("-isDeleted -updatedAt")
      .lean<AdminSetting[]>()
      .exec();
  }

  public static async create(body: AdminSetting): Promise<{ settingData: AdminSetting }> {
    const settingData = await AdminSettingModel.create({ ...body } as AdminSetting);
    return { settingData };
  }

  public static async delete(id: string): Promise<{ settingData: any }> {
    const settingData = await AdminSettingModel.findByIdAndDelete(id);
    if (!settingData) throw new NoDataError();
    return { settingData };
  }

  public static async updateCate(id: string, body: AdminSetting): Promise<{ settingData: any }> {
    const settingData = await AdminSettingModel.findByIdAndUpdate(id, { ...body } as AdminSetting);
    if (!settingData) throw new NoDataError();
    return { settingData };
  }

}
