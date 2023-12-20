import { NextFunction, Response, Request } from "express";

import { NoDataError } from "../../../core/ApiError";
import { SuccessResponse } from "../../../core/ApiResponse";
// import UserRepo from "../../../database/repository/UserRepo";
import asyncHandler from "../../../helpers/async";
import rewardsRepo from "./rewards.repository";
import { sendMail2 } from "../../../helpers/mail";
import { getGC } from "../../../helpers/rewards";
import { emailTemplate } from "../../../helpers/rewards";
import IUserRepository from '../../../database/repository/iuser.repository';
import SERVICE_IDENTIFIER from '../../../identifiers';
import { resolve } from '../../../dependencymanagement';

export class rewardsController {


  getUserRepository(): IUserRepository {
    return resolve<IUserRepository>(SERVICE_IDENTIFIER.UserRepository);
  }

  userRepository = this.getUserRepository();

  get = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      const rewards = await rewardsRepo.get();
      if (!rewards) throw new NoDataError();
      new SuccessResponse('fetch successfully', rewards).send(res);
    }
  )

  add = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      // generate the amazon gift card
      const gc = await getGC(Number(req.body.points));

      // append the gc info to request body of reward
      const { reward } = await rewardsRepo.add({
        ...req.body,
        code: gc.gcClaimCode,
        points: Number(gc.cardInfo.value.amount),
        cardNumber: gc.cardInfo.cardNumber,
        gcCurrencyCode: gc.cardInfo.value.currencyCode,
        gcExpirationDate: gc.gcExpirationDate,
        gcId: gc.gcId,
        creationRequestId: gc.creationRequestId,
      });

      // send the confirmation email to the recepient
      const userFrom = await this.userRepository.findById(req.body.userIdFrom)
      const userTo = await this.userRepository.findById(req.body.userIdTo)

      console.log("Optional Message: ")
      const optionalMsg = req.body.message || ""
      console.log(optionalMsg)

      // const message = `Congratulations ${userTo?.name}!, ${userFrom?.name} has given you ${req.body.points} points. Check it out on Culturefy! Don't forget to give thanks`;
      const [message, html] = emailTemplate(
        userFrom!.name, 
        userTo!.name, 
        req.body.points, 
        gc.gcClaimCode,
        optionalMsg)
      const mailResponse = await sendMail2({
        to: "" + userTo?.email,
        content: message,
        text: message,
        html: html,
        subject: `You received ${req.body.points} points! Check it out!`
      })

      // we use defaultTo in the meantime because most emails of users in backend
      // use temporary email, which most already expired
      // comment the code below and uncomment above to enable sending email to the actual user 
      // const mailResponse = await sendMail2({
      //   to: ZOHOMAIL.defaultTo!,
      //   content: `Congratulations ${userTo?.name} ${userFrom?.name} has given you ${req.body.points} points. Check it out on Culturefy! Don't forget to give thanks`,
      //   text: `Congratulations ${userTo?.name} ${userFrom?.name} has given you ${req.body.points} points. Check it out on Culturefy! Don't forget to give thanks`,
      //   subject: "You received points! Check who gave it to you!"
      // })

      console.log("mailResponse ")
      console.log(mailResponse)
      new SuccessResponse('Added successfully', reward).send(res)
    }
  )
}

