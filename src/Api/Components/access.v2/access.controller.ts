import { Response, Request, NextFunction } from "express"
import asyncHandler from "../../../helpers/async";
import { BadRequestError, AuthFailureError } from '../../../core/ApiError';
import { SuccessResponse } from '../../../core/ApiResponse';
import { AccessService } from "./access.service";
import UserRepository from "./user.repository";

export class AccessController {

  private readonly accessService = new AccessService();

  signUp = asyncHandler(
    async (req: Request, res: Response): Promise<Response | void> => {
      const { students, parent, emergencyContact } = req.body;
      const { mother = null, father = null, ...parentData } = parent;

      // if parent email is already registered
      const user = await UserRepository.findByEmail(parent.email);
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


  signIn = asyncHandler(
    async (req: Request, res: Response): Promise<Response | void> => {
      const { email, password } = req.body;
      const data = await this.accessService.userLogin(email, password)
      new SuccessResponse( 
        'Login Success', data).send(res);
    }
  )

}
