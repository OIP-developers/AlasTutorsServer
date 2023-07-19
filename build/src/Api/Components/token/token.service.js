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
exports.TokenService = void 0;
const token_repository_1 = __importDefault(require("./token.repository"));
const ApiError_1 = require("../../../core/ApiError");
class TokenService {
    createToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenCreated = yield token_repository_1.default.create(token);
            return { token: tokenCreated };
        });
    }
    findForEmailVerification({ user, token, otp }) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenfound = yield token_repository_1.default.find({
                userId: user,
                shot_code: otp,
                token,
                type: 'PHONE_VERIFY'
            });
            return tokenfound;
        });
    }
    findForPasswordVerification({ user, otp }) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenfound = yield token_repository_1.default.find({
                userId: user,
                shot_code: otp,
                type: 'FORGOT_PASSWORD'
            });
            return tokenfound;
        });
    }
    findForPhoneVerification({ user, otp }) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenfound = yield token_repository_1.default.find({
                userId: user,
                shot_code: otp,
                type: 'PHONE_VERIFY'
            });
            return tokenfound;
        });
    }
    verifyCode({ code, type }) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenfound = yield token_repository_1.default.findOne({
                where: {
                    type,
                    OR: [
                        {
                            token: code
                        },
                        {
                            shot_code: code
                        }
                    ],
                    // expireAt: {
                    //   gte: new Date()
                    // }
                }
            });
            if (!tokenfound)
                throw new ApiError_1.AuthFailureError('invalid or expire token');
            return tokenfound;
        });
    }
}
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map