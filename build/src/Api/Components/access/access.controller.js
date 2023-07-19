"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessController = void 0;
// import { Types } from 'mongoose';
// import crypto from 'crypto';
const async_1 = __importDefault(require("../../../helpers/async"));
const user_repository_1 = __importDefault(require("./user.repository"));
const ApiError_1 = require("../../../core/ApiError");
const tokenKeyGenerator_1 = require("../../../helpers/tokenKeyGenerator");
const otpGenerate_1 = require("../../../helpers/otpGenerate");
const ApiResponse_1 = require("../../../core/ApiResponse");
const lodash_1 = __importDefault(require("lodash"));
const authUtils_1 = require("../../../utils/authUtils");
const keystore_repository_1 = __importDefault(require("./keystore.repository"));
const token_service_1 = require("../token/token.service");
const password_1 = require("../../../utils/password");
// import { sendMail } from "../../../utils/email";
// import JWT from '../../../core/JWT';
// import { validateTokenData, createTokens, getAccessToken } from '../../../utils/authUtils';
class AccessController {
    constructor() {
        this.tokenService = new token_service_1.TokenService();
        // readonly service: AccessService = new AccessService()
        this.signup = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = yield user_repository_1.default.findByEmail(req.body.email);
            if (user)
                throw new ApiError_1.BadRequestError('User already registered');
            // if (user && user.email) throw new BadRequestError('User already registered');
            const accessTokenKey = (0, tokenKeyGenerator_1.generateTokenKey)();
            const refreshTokenKey = (0, tokenKeyGenerator_1.generateTokenKey)();
            const { user: createdUser, keystore } = yield user_repository_1.default.create(req.body, accessTokenKey, refreshTokenKey, req.body.role);
            if (!createdUser)
                throw new ApiError_1.BadRequestError('User creation field!');
            const tokens = yield (0, authUtils_1.createTokens)(createdUser, keystore.primaryKey, keystore.secondaryKey);
            const { token } = yield this.tokenService.createToken({
                shot_code: (0, otpGenerate_1.generateOTP)(),
                token: (0, tokenKeyGenerator_1.generateTokenKey)(),
                type: 'PHONE_VERIFY',
                userId: createdUser.id,
                expireAt: new Date()
            });
            // if (createdUser && createdUser.phone) {
            //   // @ts-ignore
            //   console.log({ to: createdUser.phone, text: token?.shot_code });
            // }
            // let link = `http://52.192.208.76/api/v1/auth/email-verify?token=${token?.token}&user=${token?.userId}`
            // if (createdUser && createdUser.email) {
            //   // @ts-ignore
            //   sendMail({ to: createdUser.email, text: link })
            // }
            console.log("Token: ", token);
            new ApiResponse_1.SuccessResponse('Signup Successful', {
                user: lodash_1.default.pick(createdUser, ['id', 'first_name', 'last_name', 'email', 'phone_status', 'role', 'profilePicUrl', 'gender']),
                tokens,
                token,
            }).send(res);
        }));
        // signupDriver = asyncHandler(
        //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
        //     const user = await UserRepo.findByEmail(req.body.email);
        //     if (user) throw new BadRequestError('User already registered');
        //     // if (user && user.email) throw new BadRequestError('User already registered');
        //     const accessTokenKey = generateTokenKey();
        //     const refreshTokenKey = generateTokenKey();
        //     req.body.referCode = await generateCode(5, 0, 70, '')
        //     const { user: createdUser, keystore } = await UserRepo.create(
        //       req.body as User,
        //       accessTokenKey,
        //       refreshTokenKey,
        //       "DRIVER",
        //     );
        //     if (!createdUser) throw new BadRequestError('User creation field!');
        //     const tokens = await createTokens(createdUser, keystore.primaryKey, keystore.secondaryKey);
        //     const { token } = await this.tokenService.createToken({
        //       shot_code: generateOTP(),
        //       token: generateTokenKey(),
        //       type: 'PHONE_VERIFY',
        //       userId: createdUser.id,
        //       expireAt: new Date()
        //     } as Token)
        //     // let link = `http://52.192.208.76/api/v1/auth/email-verify?token=${token?.token}&user=${token?.userId}`
        //     // if (createdUser && createdUser.email) {
        //     //   // @ts-ignore
        //     //   sendMail({ to: createdUser.email, text: link })
        //     // }
        //     console.log("Token: ", token)
        //     new SuccessResponse('Signup Successful', {
        //       user: _.pick(createdUser, ['id', 'first_name', 'last_name', 'email', 'phone_status', 'role', 'profilePicUrl', 'gender']),
        //       tokens,
        //       token
        //     }).send(res);
        //   }
        // )
        this.signin = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = yield user_repository_1.default.findByEmail(req.body.email);
            console.log('====================================');
            console.log(user);
            console.log('====================================');
            if (!user)
                throw new ApiError_1.BadRequestError('Invalid credentials');
            if (!user.password)
                throw new ApiError_1.BadRequestError('Credential not set');
            if (!user.status)
                throw new ApiError_1.BadRequestError('User InActive');
            if (user.phone_status !== "VERIFIED") {
                const { token } = yield this.tokenService.createToken({
                    shot_code: (0, otpGenerate_1.generateOTP)(),
                    token: (0, tokenKeyGenerator_1.generateTokenKey)(),
                    type: 'PHONE_VERIFY',
                    userId: user.id,
                    expireAt: new Date()
                });
                // let link = `http://localhost:8001/api/v1/auth/email-verify?token=${token?.token}&user=${token?.userId}`
                // if (user && user.email) {
                //   // @ts-ignore
                //   sendMail({ to: user.email, text: link, subject: "Email Verification" })
                // }
                console.log("Signin OTP: ", token);
                throw new ApiError_1.BadRequestError('please verify your phone!');
            }
            (0, password_1.comparePassword)(req.body.password, user.password);
            const accessTokenKey = (0, tokenKeyGenerator_1.generateTokenKey)();
            const refreshTokenKey = (0, tokenKeyGenerator_1.generateTokenKey)();
            yield keystore_repository_1.default.create(user.id, accessTokenKey, refreshTokenKey);
            const tokens = yield (0, authUtils_1.createTokens)(user, accessTokenKey, refreshTokenKey);
            new ApiResponse_1.SuccessResponse('Login Success', {
                user: lodash_1.default.pick(user, ['id', 'first_name', 'last_name', 'email', 'profile_picture', 'role', 'phone_status', 'profilePicUrl', 'gender']),
                tokens: tokens,
            }).send(res);
        }));
        this.getMe = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = yield user_repository_1.default.findById(req.user.id);
            new ApiResponse_1.SuccessResponse('fetch success', { user }).send(res);
        }));
        this.getUserById = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = yield user_repository_1.default.findById(req.params.id);
            new ApiResponse_1.SuccessResponse('fetch success', { user }).send(res);
        }));
        this.addUser = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = yield user_repository_1.default.findByEmail(req.body.email);
            if (user)
                throw new ApiError_1.BadRequestError('User already registered');
            const { user: createdUser } = yield user_repository_1.default.createUser(Object.assign(Object.assign({}, req.body), { 
                // companyId: req.company.id,
                phone_status: "PENDING" }));
            new ApiResponse_1.SuccessResponse('fetch success', { user: createdUser }).send(res);
        }));
        this.getUsers = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const users = yield user_repository_1.default.findUsers();
            new ApiResponse_1.SuccessResponse('fetch success', { users }).send(res);
        }));
        // getTeachers = asyncHandler(
        //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
        //     const users = await UserRepo.findTeachers();
        //     new SuccessResponse('fetch success', { users }).send(res);
        //   }
        // )
        this.updateUser = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { body, params } = req;
            const user = yield user_repository_1.default.update(params.id, body);
            new ApiResponse_1.SuccessResponse('update success', { user }).send(res);
        }));
        this.updateMe = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            const users = req.user.id;
            const user = yield user_repository_1.default.update(users, body);
            new ApiResponse_1.SuccessResponse('update success', { user }).send(res);
        }));
        this.delete = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { params } = req;
            const user = yield user_repository_1.default.delete(params.id);
            new ApiResponse_1.SuccessResponse('delete success', { user }).send(res);
        }));
        // verifyEmail = asyncHandler(
        //   async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        //     const { token, otp, user } = req.query;
        //     if (!_.isString(user) || !Boolean(_.isString(token) || _.isString(otp))) throw new BadRequestError('Invalid Request')
        //     //@ts-ignore
        //     const tokenfound = await this.tokenService.findForEmailVerification({ token, otp, user })
        //     if (!tokenfound) throw new BadRequestError('Token Expire') //  || tokenfound.expireAt < new Date()
        //     await UserRepo.update(user, { phone_status: "VERIFIED" } as User);
        //     // res.redirect('https://elect.com/')
        //   }
        // )
        this.verifyPhone = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user.id;
            const { otp } = req.body;
            req.accessToken = (0, authUtils_1.getAccessToken)(req.headers.authorization);
            if (!lodash_1.default.isString(user) || !lodash_1.default.isString(otp))
                throw new ApiError_1.BadRequestError('Invalid Request');
            //@ts-ignore
            const otpfound = yield this.tokenService.findForPhoneVerification({ otp, user });
            if (!otpfound)
                throw new ApiError_1.BadRequestError('OTP Expire'); //  || tokenfound.expireAt < new Date()
            const accessTokenKey = (0, tokenKeyGenerator_1.generateTokenKey)();
            const refreshTokenKey = (0, tokenKeyGenerator_1.generateTokenKey)();
            const userData = yield user_repository_1.default.update(user, { phone_status: "VERIFIED" });
            yield keystore_repository_1.default.create(user, accessTokenKey, refreshTokenKey);
            // @ts-ignore
            const tokens = yield (0, authUtils_1.createTokens)(userData, accessTokenKey, refreshTokenKey);
            new ApiResponse_1.SuccessResponse('otp success', {
                user: lodash_1.default.pick(userData, ['id', 'first_name', 'last_name', 'email', 'phone_status', 'profile_picture', 'role', 'profilePicUrl', 'gender']),
                tokens: tokens
            }).send(res);
            // res.redirect('https://elect.com/')
        }));
        // signout = asyncHandler(
        //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
        //     await KeystoreRepo.remove(req.keystore._id);
        //     new SuccessMsgResponse('Logout success').send(res);
        //   }
        // )
        // verify = asyncHandler(
        //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
        //     new SuccessResponse('verify success', {
        //       user: _.pick(req.user, ['_id', 'name', 'roles', 'profilePicUrl']),
        //     }).send(res);
        //   }
        // )
        // refresh = asyncHandler(
        //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
        //     req.accessToken = getAccessToken(req.headers.authorization); // Express headers are auto converted to lowercase
        //     const accessTokenPayload = await JWT.decode(req.accessToken);
        //     validateTokenData(accessTokenPayload);
        //     const user = await UserRepo.findById(new Types.ObjectId(accessTokenPayload.sub));
        //     if (!user) throw new AuthFailureError('User not registered');
        //     req.user = user;
        //     const refreshTokenPayload = await JWT.validate(req.body.refreshToken);
        //     validateTokenData(refreshTokenPayload);
        //     if (accessTokenPayload.sub !== refreshTokenPayload.sub)
        //       throw new AuthFailureError('Invalid access token');
        //     const keystore = await KeystoreRepo.find(
        //       req.user._id,
        //       accessTokenPayload.prm,
        //       refreshTokenPayload.prm,
        //     );
        //     if (!keystore) throw new AuthFailureError('Invalid access token');
        //     await KeystoreRepo.remove(keystore._id);
        //     const accessTokenKey = crypto.randomBytes(64).toString('hex');
        //     const refreshTokenKey = crypto.randomBytes(64).toString('hex');
        //     await KeystoreRepo.create(req.user._id, accessTokenKey, refreshTokenKey);
        //     const tokens = await createTokens(req.user, accessTokenKey, refreshTokenKey);
        //     new TokenRefreshResponse('Token Issued', tokens.accessToken, tokens.refreshToken).send(res);
        //   }
        // )
        // getUsers = asyncHandler(
        //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
        //     const users = await UserRepo.find();
        //     new SuccessResponse('fetch success', {
        //       users
        //     }).send(res);
        //   }
        // )
        this.verifyEmail = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = yield user_repository_1.default.findByEmail(req.body.email);
            if (user)
                throw new ApiError_1.BadRequestError('User already registered');
            new ApiResponse_1.SuccessMsgResponse('Email Not Found');
        }));
        this.forgotPassword = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = yield user_repository_1.default.findByEmail(req.body.email);
            if (!user || !user.email)
                throw new ApiResponse_1.SuccessMsgResponse('Email send success, Check your email').send(res);
            const { token } = yield this.tokenService.createToken({
                shot_code: (0, tokenKeyGenerator_1.generateTokenKey)(5),
                token: (0, tokenKeyGenerator_1.generateTokenKey)(),
                type: 'FORGOT_PASSWORD',
                userId: user.id,
                expireAt: new Date()
            });
            let link = `http://localhost:8001/api/v1/auth/reset-password/?token=${token === null || token === void 0 ? void 0 : token.token}&user=${token === null || token === void 0 ? void 0 : token.userId}&email=${user.email}`;
            if (user && user.email) {
                // @ts-ignore
                // sendMail({ subject: 'iPrint (Forgot Password)', to: user.email, text: link })
            }
            console.log("==== link ====", link);
            new ApiResponse_1.SuccessMsgResponse('Email send success, Check your email').send(res);
        }));
        this.resetPassword = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { token, otp } = req.query;
            if (!Boolean(lodash_1.default.isString(token) || lodash_1.default.isString(otp)))
                throw new ApiError_1.BadRequestError('Invalid Request');
            const tokenfound = yield this.tokenService.verifyCode({ code: token, type: 'FORGOT_PASSWORD' });
            yield user_repository_1.default.updatePassword(tokenfound.userId, { password: req.body.password });
            new ApiResponse_1.SuccessMsgResponse('password reset Successful').send(res);
        }));
        this.passwordOTPVerify = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { otp, email } = req.body;
            const user = yield user_repository_1.default.findByEmail(email);
            if (!user)
                throw new ApiError_1.BadRequestError('User not exist');
            const userId = user.id;
            if (!lodash_1.default.isString(userId) || !lodash_1.default.isString(otp))
                throw new ApiError_1.BadRequestError('Invalid Request');
            //@ts-ignore
            const otpfound = yield this.tokenService.findForPasswordVerification({ otp, userId });
            if (!otpfound)
                throw new ApiError_1.BadRequestError('OTP Expire'); //  || tokenfound.expireAt < new Date()
            new ApiResponse_1.SuccessResponse('otp success', { user: userId }).send(res);
        }));
        this.verifyPassword = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { user } = req.query;
            // if (!_.isString(user) || _.isString(otp)) throw new BadRequestError('Invalid Request')
            //@ts-ignore
            yield user_repository_1.default.update(user, { password: req.body.password });
            new ApiResponse_1.SuccessMsgResponse('password update success').send(res);
        }));
    }
}
exports.AccessController = AccessController;
//# sourceMappingURL=access.controller.js.map