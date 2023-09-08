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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_repository_1 = __importDefault(require("../Api/Components/access/user.repository"));
const ApiError_1 = require("../core/ApiError");
const JWT_1 = __importDefault(require("../core/JWT"));
const keystore_repository_1 = __importDefault(require("../Api/Components/access/keystore.repository"));
const authUtils_1 = require("../utils/authUtils");
const validator_1 = __importStar(require("../helpers/validator"));
const joi_schema_1 = require("../utils/joi.schema");
const async_1 = __importDefault(require("../helpers/async"));
const router = (0, express_1.Router)();
exports.default = router.use((0, validator_1.default)(joi_schema_1.authBearerSchema, validator_1.ValidationSource.HEADER), (0, async_1.default)((req, _, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.accessToken = (0, authUtils_1.getAccessToken)(req.headers.authorization); // Express headers are auto converted to lowercase
    try {
        const payload = yield JWT_1.default.validate(req.accessToken);
        (0, authUtils_1.validateTokenData)(payload);
        const user = yield user_repository_1.default.findById(payload.sub);
        if (!user)
            throw new ApiError_1.AuthFailureError('User not registered');
        //@ts-ignore
        req.user = user;
        const keystore = yield keystore_repository_1.default.findforKey(req.user.id, payload.prm);
        console.log(req.user.id, payload, keystore);
        if (!keystore)
            throw new ApiError_1.AuthFailureError('Invalid access token! ABC');
        req.keystore = keystore;
        return next();
    }
    catch (e) {
        if (e instanceof ApiError_1.TokenExpiredError)
            throw new ApiError_1.AccessTokenError(e.message);
        throw e;
    }
})));
// export const authentication = (router: Router, path: string, methods: [string]): void => {
//   router.use(
//     path,
//     validator(authBearerSchema, ValidationSource.HEADER),
//     asyncHandler(async (req: any, res, next) => {
//       console.log(req.method, methods);
//       req.accessToken = getAccessToken(req.headers.authorization); // Express headers are auto converted to lowercase
//       try {
//         const payload = await JWT.validate(req.accessToken);
//         validateTokenData(payload);
//         const user = await UserRepo.findById(new Types.ObjectId(payload.sub));
//         if (!user) throw new AuthFailureError('User not registered');
//         req.user = user;
//         const keystore = await KeystoreRepo.findforKey(req.user._id, payload.prm);
//         if (!keystore) throw new AuthFailureError('Invalid access token');
//         req.keystore = keystore;
//         return next();
//       } catch (e) {
//         if (e instanceof TokenExpiredError) throw new AccessTokenError(e.message);
//         throw e;
//       }
//     }),
//   );
// }
//# sourceMappingURL=authentication.js.map