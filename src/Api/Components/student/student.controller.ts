import { Response, Request, NextFunction } from "express"

import asyncHandler from "../../../helpers/async";
import { SuccessResponse } from "../../../core/ApiResponse";
import { StudentService } from "./student.service";

export class StudentController {
  readonly service = new StudentService();

  getStudents = asyncHandler(
    async (req: Request, res: Response): Promise<Response | void> => {
      const students = await this.service.findStudents(req.user?.role?.code, req.params?.id, req.user?.id , req.query)
      new SuccessResponse('Fetch successful', students).send(res);
    }
  );

  createStudent = asyncHandler(
    async (req: Request, res: Response): Promise<Response | void> => {
      const { medicalCondition = {}, ...studentData } = req.body;
      const student = await this.service.createStudent(req.user?.role?.code, req.user?.id, studentData, medicalCondition)
      new SuccessResponse('Fetch successful', student).send(res);
    }
  );

  updateStudent = asyncHandler(
    async (req: Request, res: Response): Promise<Response | void> => {
      const studentId = req.params?.id;
      if (!studentId) throw new Error("Invalid student id");

      const { medicalCondition = undefined, ...studentData } = req.body;

      const data = await this.service.updateStudent(studentId, req.user?.role?.code, req.user?.id, studentData, medicalCondition)
      new SuccessResponse('Fetch successful', data).send(res);
    }
  )

  deleteStudent = asyncHandler(
    async (req: Request, res: Response): Promise<Response | void> => {
      const studentId = req.params?.id;
      if (!studentId) throw new Error("Invalid student id");
      const students = await this.service.deleteStudent(studentId, req.user?.role?.code, req.user?.id)
      new SuccessResponse('Fetch successful', students).send(res);
    }
  )

}
