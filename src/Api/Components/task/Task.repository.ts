import Task, { TaskModel, ITask } from './Task';
import AssignTask, { AssignTaskModel, IAssignTask } from './AssignedTask';
import { NoDataError } from '../../../core/ApiError';
import { Schema } from 'mongoose';

export default class TaskRepo {

  public static find(): Promise<Task[]> {
    return TaskModel
      .find({ isDeleted: false })
      .select("-isDeleted -updatedAt")
      .lean<Task[]>()
      .exec();
  }

  public static findById(id: Schema.Types.ObjectId): Promise<Task[]> {
    return TaskModel
      .findOne({ isDeleted: false , _id : id })
      .select("-isDeleted -updatedAt")
      .lean<Task[]>()
      .exec();
  }

  public static async taskAssignToUser(body: IAssignTask): Promise<{ task: AssignTask }> {
    const task = await AssignTaskModel.create({ ...body } as AssignTask);
    return { task };
  }

  public static async create(body: ITask): Promise<{ task: Task }> {
    const task = await TaskModel.create({ ...body } as Task);
    return { task };
  }

  public static async delete(id: string): Promise<{ task: any }> {
    const task = await TaskModel.findByIdAndDelete(id);
    if (!task) throw new NoDataError();
    return { task };
  }

  public static async updateCate(id: string, body: Task): Promise<{ task: any }> {
    const task = await TaskModel.findByIdAndUpdate(id, { ...body } as Task);
    if (!task) throw new NoDataError();
    return { task };
  }

}
