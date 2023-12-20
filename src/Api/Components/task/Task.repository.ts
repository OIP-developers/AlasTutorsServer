import Task, { TaskModel, ITask } from './Task';
import AssignTask, { AssignTaskModel, IAssignTask } from './AssignedTask';
import GoalTask, { GoalTaskModel, IGoalTask } from './GoalTask';
import { NoDataError } from '../../../core/ApiError';
import { Schema, Types } from 'mongoose';

export default class TaskRepo {

  public static find(): Promise<Task[]> {
    return TaskModel
      .find({ isDeleted: false })
      .select("-isDeleted -updatedAt")
      .lean<Task[]>()
      .exec();
  }

  public static findById(id: Schema.Types.ObjectId): Promise<Task> {
    return TaskModel
      .findOne({ isDeleted: false, _id: id })
      .select("-isDeleted -updatedAt")
      .lean<Task>()
      .exec();
  }

  public static findWithTasks(goalId: string): Promise<any> {

    const goalsWithTasks = GoalTaskModel.aggregate([
      {
        "$match": {
          $expr: {
            $eq: ["$_id", { $toObjectId: goalId }],
          },
        },
      },
      {
        $lookup: {
          from: "tasks",
          let: { taskId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$goalTask", { $toString: "$$taskId" }]
                },
              }
            },
          ],
          as: "tasks"
        }
      }
    ]).exec()

    return goalsWithTasks
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
    const task = await TaskModel.findByIdAndUpdate(id, { ...body } as Task, { new: true });
    if (!task) throw new NoDataError();
    return { task };
  }



  // Create goal task by position goal id
  public static async createGoalTask(body: IGoalTask): Promise<{ task: GoalTask }> {
    const task = await GoalTaskModel.create({ ...body } as GoalTask);
    if (!task) throw new NoDataError();
    return { task };
  }


  // Get goals task by business id
  public static async getGoalTasks(query: any): Promise<GoalTask[]> {
    return GoalTaskModel
      .find({ isDeleted: false, ...query })
      .select("-isDeleted -updatedAt")
      .lean<GoalTask[]>()
      .exec();
  }

}
