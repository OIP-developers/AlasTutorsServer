"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokens = exports.validateTokenData = exports.getAccessToken = void 0;
const ApiError_1 = require("../core/ApiError");
const JWT_1 = __importStar(require("../core/JWT"));
const globals_1 = require("../config/globals");
const getAccessToken = (authorization) => {
    if (!authorization)
        throw new ApiError_1.AuthFailureError('Invalid Authorization');
    if (!authorization.startsWith('Bearer '))
        throw new ApiError_1.AuthFailureError('Invalid Authorization');
    return authorization.split(' ')[1];
};
exports.getAccessToken = getAccessToken;
const validateTokenData = (payload) => {
    if (!payload || !payload.iss || !payload.aud || !payload.sub || !payload.prm || payload.iss !== globals_1.tokenInfo.issuer || payload.aud !== globals_1.tokenInfo.audience)
        throw new ApiError_1.AuthFailureError('Invalid Access Token');
    return true;
};
exports.validateTokenData = validateTokenData;
const createTokens = (user, accessTokenKey, refreshTokenKey) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = yield JWT_1.default.encode(new JWT_1.JwtPayload(globals_1.tokenInfo.issuer, globals_1.tokenInfo.audience, user.id.toString(), accessTokenKey, globals_1.tokenInfo.accessTokenValidityDays));
    if (!accessToken)
        throw new ApiError_1.InternalError();
    const refreshToken = yield JWT_1.default.encode(new JWT_1.JwtPayload(globals_1.tokenInfo.issuer, globals_1.tokenInfo.audience, user.id.toString(), refreshTokenKey, globals_1.tokenInfo.refreshTokenValidityDays));
    if (!refreshToken)
        throw new ApiError_1.InternalError();
    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
    };
});
exports.createTokens = createTokens;
//# sourceMappingURL=authUtils.js.map