"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authBearerSchema = exports.apiKeySchema = exports.employeeUpdateSchema = exports.driverSignupSchema = exports.signupSchema = exports.verifyPassword = exports.refreshToken = exports.userCredential = void 0;
const joi_1 = __importDefault(require("joi"));
const validator_1 = require("../helpers/validator");
exports.userCredential = joi_1.default.object().keys({
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().required().min(6),
});
exports.refreshToken = joi_1.default.object().keys({
    refreshToken: joi_1.default.string().required().min(1),
});
exports.verifyPassword = joi_1.default.object().keys({
    password: joi_1.default.string().required().min(6),
});
//  export const jj =   auth: Joi.object()
//         .keys({
//             authorization: JoiAuthBearer().required(),
//         })
//         .unknown(true)
exports.signupSchema = joi_1.default.object().keys({
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().required().min(6),
    first_name: joi_1.default.string().required(),
    last_name: joi_1.default.string().required(),
    phone: joi_1.default.string().required(),
    dateOfBirth: joi_1.default.string().optional(),
    gender: joi_1.default.string().optional(),
    referCode: joi_1.default.string().optional(),
    // role: Joi.string().valid('ADMIN', 'USER').required(),
});
exports.driverSignupSchema = joi_1.default.object().keys({
    // username: Joi.string().required(),
    phone: joi_1.default.string().required(),
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().required().min(6),
    first_name: joi_1.default.string().required(),
    last_name: joi_1.default.string().required(),
    profile_picture: (0, validator_1.JoiUrlEndpoint)().optional(),
    dateOfBirth: joi_1.default.date().required(),
    gender: joi_1.default.string().required(),
});
exports.employeeUpdateSchema = joi_1.default.object().keys({
    password: joi_1.default.any().optional(),
    first_name: joi_1.default.string().optional(),
    last_name: joi_1.default.string().optional(),
    email: joi_1.default.string().optional().email(),
    phone: joi_1.default.string().optional(),
    batchId: joi_1.default.string().optional(),
    profile_picture: (0, validator_1.JoiUrlEndpoint)().optional(),
    gender: joi_1.default.string().optional(),
    role: joi_1.default.string().optional(),
    image: joi_1.default.string().optional(),
    status: joi_1.default.boolean().optional(),
});
exports.apiKeySchema = joi_1.default.object().keys({
    'x-api-key': joi_1.default.string().required(),
}).unknown(true);
exports.authBearerSchema = joi_1.default.object().keys({
    authorization: (0, validator_1.JoiAuthBearer)().required(),
}).unknown(true);
//# sourceMappingURL=joi.schema.js.map