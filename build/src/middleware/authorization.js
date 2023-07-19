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
const ApiError_1 = require("../core/ApiError");
const role_repository_1 = __importDefault(require("../Api/Components/roles/role.repository"));
const asyncHandler_1 = __importDefault(require("../helpers/asyncHandler"));
function authrization(allow_roles) {
    return (0, asyncHandler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
        // console.log('====================================');
        // console.log(allow_roles.includes(req.user.role.code))
        // console.log(allow_roles)
        // console.log(req.user.role.code);
        // console.log('====================================');
        const role = yield role_repository_1.default.findById(req.user.roleId);
        if (!allow_roles.includes(req.user.role.code))
            throw new ApiError_1.AuthFailureError('Permission denied, You dont have permission for this action');
        else if (!req.user || !req.user.role)
            throw new ApiError_1.AuthFailureError('Permission denied, You dont have role');
        else if (!role)
            throw new ApiError_1.AuthFailureError('Permission denied, Invalid role');
        else
            return next();
    }));
}
exports.default = authrization;
//# sourceMappingURL=authorization.js.map