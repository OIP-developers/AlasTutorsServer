import { Router } from 'express';
import { StudentController } from './student.controller';
import authentication from '../../../middleware/authentication';
import validator from '../../../helpers/validator';
import { updateStudentSchema } from "../../../utils/joi.schema"

export class StudentRoutes {

  readonly router: Router = Router();
  private readonly controller = new StudentController()

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.get('/:id?', authentication, this.controller.getStudents)

    this.router.post('/', validator(updateStudentSchema), authentication, this.controller.createStudent)

    this.router.put('/:id', validator(updateStudentSchema), authentication, this.controller.updateStudent)

    this.router.delete('/:id', authentication, this.controller.deleteStudent)
  }

}
