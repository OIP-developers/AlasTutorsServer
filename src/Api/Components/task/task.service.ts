import { ITask } from "../task/Task"
import { IAssignTask } from "../task/AssignedTask"
import TaskRepo from './Task.repository';

export class TaskService {

  async createTasks(tasks: ITask[], goalId: string) {

    const createdTasks = []
    for await (const element of tasks) {

      const { task } = await TaskRepo.create({ ...element, goalTask: goalId });

      if(element.user.length) await this.createAssignedTasks(element , task._id)

      createdTasks.push(task)
    }

    return createdTasks;
  }

  async createAssignedTasks(taskObj: ITask, taskid: string) {

    for await (const element of taskObj.user) {
      await TaskRepo.taskAssignToUser({ ...taskObj, user: element , task : taskid });
    }
  }

}
