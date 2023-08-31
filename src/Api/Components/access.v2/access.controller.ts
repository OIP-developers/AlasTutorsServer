import { Response, Request, NextFunction } from "express"
import asyncHandler from "../../../helpers/async";
import { BadRequestError, AuthFailureError } from '../../../core/ApiError';
import { SuccessResponse } from '../../../core/ApiResponse';
import { AccessService } from "./access.service";
import UserRepository from "./user.repository";

export class AccessController {

  private readonly accessService = new AccessService()
  private readonly userRepo = new UserRepository()
  signup = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      const { students, parent, emergencyContact } = req.body;
      const { mother = null, father = null, ...parentData } = parent;

      // if parent email is already registered
      const user = await this.userRepo.findUnique({ where: { email: parent.email }, include: { childs: false } });
      if (user) throw new BadRequestError('User already registered');

      const allGuardians: any = [];
      if (mother) {
        allGuardians.push({ ...mother, type: "MOTHER" });
      }

      if (father) {
        allGuardians.push({ ...father, type: "FATHER" });
      }

      const data = await this.accessService.createParentUser(parentData, emergencyContact, students, allGuardians)

      new SuccessResponse('Signup Successful', data).send(res);
    }
  )

}
