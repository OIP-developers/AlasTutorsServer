import { Response, Request, NextFunction } from "express"
import { Types } from 'mongoose';
import asyncHandler from "../../../helpers/async";
import UserRepo from '../../../database/repository/UserRepo';
// import { BusinessService } from "../business/business.repository";
import { BadRequestError, AuthFailureError } from '../../../core/ApiError';
import User from '../../../database/model/User';
import { SuccessResponse, SuccessMsgResponse, TokenRefreshResponse, InternalErrorResponse } from '../../../core/ApiResponse';
import _ from 'lodash';
import { createTokens, getAccessToken, validateTokenData } from '../../../utils/authUtils';
import KeystoreRepo from '../../../database/repository/KeystoreRepo';
import { comparePassword } from "../../../utils/password";
import JWT from '../../../core/JWT';
// import { validateTokenData, createTokens, getAccessToken } from '../../../utils/authUtils';
import { AccessService } from './access.service'
import Logger from '../../../core/Logger';
import RoleRepo from "../../../database/repository/RoleRepo";
import Role, { RoleCode } from "../../../database/model/Role";

import { selectArray } from "../../../database/repository/UserRepo";
import { Repository as TeacherRepo } from "../teacher/teacher.repository";
import { Repository as StudentRepo } from "../student/student.repository";

export class AccessController {

  readonly service: AccessService = new AccessService()

  signupTeacher = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { personalInfo, data } = req.body

      const user = await UserRepo.findByEmail(personalInfo.email);
      if (user) throw new BadRequestError('User already registered');

      const { tokens, user: createdUser } = await this.service.generate('SIGNUP', personalInfo as User)

      //need to implement error handling here
      await TeacherRepo.create({ userId: createdUser._id, data: data })

      new SuccessResponse('Signup Successful', {
        user: _.pick(createdUser, ['_id', 'first_name', 'last_name']),
        tokens,
      }).send(res);
    }
  )

  signupStudent = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { personalInfo, data } = req.body

      const user = await UserRepo.findByEmail(personalInfo.email);
      if (user) throw new BadRequestError('User already registered');

      const { tokens, user: createdUser } = await this.service.generate('SIGNUP', personalInfo as User)

      //need to implement error handling here
      await StudentRepo.create({ userId: createdUser._id, data: data })

      //stripe logic here


      new SuccessResponse('Signup Successful', {
        user: _.pick(createdUser, ['_id', 'first_name', 'last_name']),
        tokens,
      }).send(res);
    }
  )

  signup = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      console.log(req.body);

      const user = await UserRepo.findByEmail(req.body.email);
      if (user) throw new BadRequestError('User already registered');

      const { tokens, user: createdUser } = await this.service.generate('SIGNUP', req.body as User)

      Logger.info("Login Success", { user: _.pick(createdUser, ['_id', 'name', 'role', 'email', 'telegram_id']) })
      new SuccessResponse('Signup Successful', {
        user: _.pick(createdUser, ['_id', 'name', 'email', 'role', 'profilePicUrl', 'stripe_customerId']),
        tokens,
      }).send(res);
    }
  )

  signin = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {

      const user = await UserRepo.findByEmail(req.body.email);

      console.log(user, "user===============================")

      if (!user) throw new BadRequestError('Invalid credentials');


      if (!user.password || !user.email) throw new BadRequestError('Credential not sent');

      comparePassword(req.body.password, user.password)

      const { tokens } = await this.service.generate('SIGNIN', user as User)

      Logger.info("Login Success", { user: _.pick(user, selectArray) })

      new SuccessResponse('Login Success', {
        user: _.pick(user, selectArray),
        tokens: tokens,
      }).send(res);

    }
  )

  signout = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      await KeystoreRepo.remove(req.keystore._id);
      new SuccessMsgResponse('Logout success').send(res);
    }
  )

  verify = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {

      const tokens = await createTokens(req.user, { ip: "192.168.0.2" }, req.keystore.primaryKey, req.keystore.secondaryKey)
      delete req.user.password
      new SuccessResponse('verify success', {
        user: req.user, // : _.pick(req.user, ['_id', 'name', 'role', 'email', 'telegram_id', 'profilePicUrl'])
        tokens
      }).send(res);
    }
  )

  refresh = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      req.accessToken = getAccessToken(req.headers.authorization); // Express headers are auto converted to lowercase

      const accessTokenPayload = await JWT.decode(req.accessToken);
      validateTokenData(accessTokenPayload);

      const user = await UserRepo.findById(new Types.ObjectId(accessTokenPayload.sub));
      if (!user) throw new AuthFailureError('User not registered');
      req.user = user;

      const refreshTokenPayload = await JWT.validate(req.body.refreshToken);
      validateTokenData(refreshTokenPayload);

      if (accessTokenPayload.sub !== refreshTokenPayload.sub)
        throw new AuthFailureError('Invalid access token');

      const keystore = await KeystoreRepo.find(
        req.user._id,
        accessTokenPayload.prm,
        refreshTokenPayload.prm,
      );

      if (!keystore) throw new AuthFailureError('Invalid access token');
      await KeystoreRepo.remove(keystore._id);

      // const accessTokenKey = crypto.randomBytes(64).toString('hex');
      // const refreshTokenKey = crypto.randomBytes(64).toString('hex');

      // await KeystoreRepo.create(req.user._id, accessTokenKey, refreshTokenKey);
      // const tokens = await createTokens(req.user, { ip: "192.168.0.2" }, accessTokenKey, refreshTokenKey);

      const { tokens } = await this.service.generate('SIGNIN', req.user as User)

      new TokenRefreshResponse('Token Issued', tokens.accessToken, tokens.refreshToken).send(res);
    }
  )

  getUser = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const user = await UserRepo.findById(req.query.userId);
      new SuccessResponse('fetch success', {
        user
      }).send(res)
    }
  )

  getUsers = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const users = await UserRepo.findUsers();
      new SuccessResponse('fetch success', {
        users
      }).send(res);
    }
  )

  deleteUser = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const user = await UserRepo.delete(req.params._id);
      new SuccessResponse('deleted successfully', user).send(res);
    }
  )

  updateMe = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const user = await UserRepo.updateInfo(req.user._id, req.body)
      new SuccessResponse('update success', { user }).send(res);
    }
  )

}
