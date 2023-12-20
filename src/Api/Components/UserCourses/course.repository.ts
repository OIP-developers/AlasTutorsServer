import { Aggregate } from 'mongoose'
import UserCourse, { UserCourseModel, DOCUMENT_NAME } from './UserCourse';
import { NoDataError } from '../../../core/ApiError';


export class UserCourseRepo {

  public static findAll(): Promise<UserCourse[]> {
    return UserCourseModel
      .find({ isDeleted: false })
      .select("-isDeleted -updatedAt")
      .lean<UserCourse[]>()
      .exec();
  }

  public static async create(body: UserCourse): Promise<{ user_course: UserCourse }> {
    const user_course = await UserCourseModel.create({ ...body } as UserCourse);
    return { user_course };
  }

  public static async delete(id: string): Promise<{ user_course: UserCourse }> {
    const user_course = await UserCourseModel.findByIdAndDelete(id);
    if (!user_course) throw new NoDataError();
    return { user_course };
  }

  public static async update(id: string, body: UserCourse): Promise<{ user_course: UserCourse }> {
    const user_course = await UserCourseModel.findByIdAndUpdate(id, { ...body } as UserCourse);
    if (!user_course) throw new NoDataError();
    return { user_course };
  }

}
