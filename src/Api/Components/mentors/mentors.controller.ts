import { NextFunction, Response, Request } from "express";
import { NoDataError } from "../../../core/ApiError";
import { SuccessResponse } from "../../../core/ApiResponse";
import UserRepo from "../../../database/repository/UserRepo";
import asyncHandler from "../../../helpers/asyncHandler";
import mentorsRepo from "./mentors.repository";
import { incomingMentorshipRequestType } from "./mentors";

export class mentorsController {
  get = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      const mentors = await mentorsRepo.get();
      console.log("get mentors response")
      console.log(mentors)
      if (mentors.length === 0) throw new NoDataError('no mentors available');
      new SuccessResponse('mentors fetched successfully', mentors).send(res)
    }
  )

  getOne = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      console.log("requesting for mentor with userId: " + req.query.mentorUserId)
      // @ts-ignore
      const mentor = await mentorsRepo.getOne(req.query.mentorUserId)
      console.log("get mentor response")
      console.log(mentor)
      console.log("incmingMentorshipRequests")
      console.log(mentor?.get("incomingMentorshipRequests"))
      if (!mentor) throw new NoDataError('mentor cannot be found')
      new SuccessResponse('mentor found', mentor).send(res)
    }
  )

  getIncomingMentorshipRequests = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      // @ts-ignore
      const mentor = await mentorsRepo.getOne(req.query.mentorUserId)
      if (!mentor) throw new NoDataError('mentor cannot be found')
      const incomingMentorshipRequests = mentor.get("incomingMentorshipRequests");
      if (!incomingMentorshipRequests) throw new NoDataError('no incoming mentorship requests')
      new SuccessResponse(`incoming mentorship requests for ${mentor.get('userId')} found`, incomingMentorshipRequests).send(res)
    }
  )

  add = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      const mentor = await mentorsRepo.add(req.body);
      new SuccessResponse('Added successfully', mentor).send(res)
    }
  )

  applyMentorship = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      const mentor = await mentorsRepo.applyMentorship(
        req.body.requestorUserId, 
        req.body.requestorEmail,
        req.body.mentorUserId);
      new SuccessResponse('Apply for mentorship request added successfully', mentor).send(res)
    }
  )

  acceptMentorship = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      const mentor = await mentorsRepo.acceptMentorship(
        req.body.requestorUserId,
        req.body.mentorUserId
      );
      new SuccessResponse('Successfully approved mentorship request', mentor).send(res)
    }
  )

  ignoreMentorship = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      const mentor = await mentorsRepo.ignoreMentorship(
        req.body.requestorUserId,
        req.body.mentorUserId
      )
      new SuccessResponse('Successfully ignored mentorship request', mentor).send(res)
    }
  )
}

