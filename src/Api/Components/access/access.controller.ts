import { Response, Request, NextFunction } from "express"
import { Types } from 'mongoose';
import asyncHandler from "../../../helpers/async";
// import UserRepo from '../../../database/repository/UserRepo';
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
import SERVICE_IDENTIFIER from '../../../identifiers';
import { IAccessService } from './iaccess.service';
import { resolve } from '../../../dependencymanagement';
import { AppSigninPayloadDTO } from '../../../Interface/payloadInterface/Access';
import IUserRepository from '../../../database/repository/iuser.repository';
import { DatabaseId } from '../../../../types';

export class AccessController {

  // readonly service: AccessService = new AccessService()
  // readonly BusinessService = new BusinessService()

  getAccessService(): IAccessService {
    return resolve<IAccessService>(SERVICE_IDENTIFIER.AccessService);
  }

  getUserRepository(): IUserRepository {
    return resolve<IUserRepository>(SERVICE_IDENTIFIER.UserRepository);
  }

  accessService = this.getAccessService();
  UserRepo = this.getUserRepository();


  signup = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      console.log(req.body);

      const user = await this.UserRepo.findByEmail(req.body.email);
      if (user) throw new BadRequestError('User already registered');

      const { tokens, user: createdUser } = await this.accessService.generate('SIGNUP', req.body as User)

      Logger.info("Login Success", { user: _.pick(createdUser, ['_id', 'name', 'role', 'email', 'telegram_id']) })
      new SuccessResponse('Signup Successful', {
        user: _.pick(createdUser, ['_id', 'name', 'email', 'role', 'profilePicUrl', 'stripe_customerId']),
        tokens,
      }).send(res);
    }
  )

  createUser = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {

      req.body.createdBy = req.user._id

      const { user } = await this.UserRepo.createUser(req.body, req.body.role)

      Logger.info("Instructor Create Success")
      new SuccessResponse('User Created Successful', {
        user,
      }).send(res);
    }
  )

  // Create a user for business
  createUserBusiness = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {

      req.body.createdBy = req.user._id

      const { user } = await this.UserRepo.createUser(req.body, req.body.role)

      Logger.info("Instructor Create Success")
      new SuccessResponse('User Created Successful', {
        user,
      }).send(res);
    }
  )

  // signupWithTelegram = asyncHandler(
  //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
  //     console.log("We are here", req);
  //     const userExist = await this.UserRepo.findByTelegram(req.query.id);
  //     console.log(req.query);
  //     console.log(userExist);

  //     let user, tokens;
  //     if (userExist) {
  //       const { tokens: createdTokens, user: createdUser } = await this.accessService.generate('SIGNIN', userExist as User)
  //       user = createdUser;
  //       tokens = createdTokens;
  //     } else {
  //       const body = {
  //         telegram_id: req.query.id,
  //         name: `${req.query.first_name} ${req.query.last_name}`,
  //         profilePicUrl: req.query.photo_url
  //       }
  //       const { tokens: createdTokens, user: createdUser } = await this.accessService.generate('SIGNUP', body as User)
  //       user = createdUser;
  //       tokens = createdTokens;
  //     }
  //     res.redirect(`https://kingscharts.io?accessToken=${tokens?.accessToken}`)
  //   }
  // )

  signupWithGoogle = async (accessToken: any, refreshToken: any, unknow: any, profile: any, done: any) => {

    const userExist = await this.UserRepo.findByGoogle(profile.id, profile.emails[0].value);
    let user, tokens;
    if (userExist) {
      const { tokens: createdTokens, user: createdUser } = await this.accessService.generate('SIGNIN', userExist as User)
      user = createdUser;
      tokens = createdTokens;
    } else {
      const body = {
        google_id: profile.id,
        name: `${profile.displayName}`,
        email: profile.emails[0].value
      }
      const { tokens: createdTokens, user: createdUser } = await this.accessService.generate('SIGNUP', body as User)
      user = createdUser;
      tokens = createdTokens;
    }
    Logger.info("Login Success", { user: _.pick(user, ['_id', 'name', 'role', 'email', 'telegram_id']) })
    return done(null, { user, tokens });
  }

  signin = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {

      const user = await this.UserRepo.findByEmail(req.body.email);

      console.log(user, "user")

      if (!user) throw new BadRequestError('Invalid credentials');

      if (!user.password || !user.email) throw new BadRequestError('Credential not set');

      comparePassword(req.body.password, user.password)

      const { tokens } = await this.accessService.generate('SIGNIN', user as User)

      Logger.info("Login Success", { user: _.pick(user, selectArray) })

      new SuccessResponse('Login Success', {
        user: _.pick(user, selectArray),
        tokens: tokens,
      }).send(res);

    }
  )

  appSignin = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      let bodyData : AppSigninPayloadDTO = req.body
      const result = await this.accessService.appSignin(bodyData)
      new SuccessResponse('Login Success', result).send(res);

    }
  )

  loginSuccess = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
      if (req.user) {
        // @ts-ignore
        res.redirect(`https://kingscharts.io?accessToken=${req.user?.tokens?.accessToken}`)
      } else {
        new AuthFailureError('Login with google field!')
      }
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

  createdByExist = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {

      console.log(req.user, "userrr")
      const users = await this.UserRepo.findByBusiness(req.user.business._id)
      delete req.user.password
      new SuccessResponse('fetch success', {
        user: users, // : _.pick(req.user, ['_id', 'name', 'role', 'email', 'telegram_id', 'profilePicUrl'])
      }).send(res);
    }
  )

  refresh = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      req.accessToken = getAccessToken(req.headers.authorization); // Express headers are auto converted to lowercase

      const accessTokenPayload = await JWT.decode(req.accessToken);
      validateTokenData(accessTokenPayload);

      const user = await this.UserRepo.findById(new Types.ObjectId(accessTokenPayload.sub));
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

      const { tokens } = await this.accessService.generate('SIGNIN', req.user as User)

      new TokenRefreshResponse('Token Issued', tokens.accessToken, tokens.refreshToken).send(res);
    }
  )

  getUser = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const user = await this.UserRepo.findById(req.query.userId);
      new SuccessResponse('fetch success', {
        user
      }).send(res)
    }
  )

  getUsers = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {

      let query = {}

      if (req.user.role.code !== 'SUPER_ADMIN') {
        query = { business: req.user.business._id }
      }

      const users = await this.UserRepo.find(req.user.role, query);
      new SuccessResponse('fetch success', {
        users
      }).send(res);
    }
  )

  deleteUser = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const user = await this.UserRepo.delete(req.params._id);
      new SuccessResponse('deleted successfully', user).send(res);
    }
  )

  updateMe = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const user = await this.UserRepo.updateInfo(req.user._id, req.body)
      new SuccessResponse('update success', { user }).send(res);
    }
  )

  // businessDetails = asyncHandler(
  //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
  //     const { business } = await this.BusinessService.BusinessSave(req.user._id, req.body)
  //     new SuccessResponse('success', { business }).send(res);
  //   }
  // )

  getSameBusinessUsersByNameDropdown = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {

      const businessId : DatabaseId = req.user.business._id
      const userName : string = req.query.name

      const user = await this.UserRepo.findByNameAndBusinessId( userName, businessId);
      new SuccessResponse('fetch success', {
        user
      }).send(res)
    }
  )

}
