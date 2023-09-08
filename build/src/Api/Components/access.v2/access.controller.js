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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessController = void 0;
const async_1 = __importDefault(require("../../../helpers/async"));
const ApiError_1 = require("../../../core/ApiError");
const ApiResponse_1 = require("../../../core/ApiResponse");
const access_service_1 = require("./access.service");
const user_repository_1 = __importDefault(require("./user.repository"));
class AccessController {
    constructor() {
        this.accessService = new access_service_1.AccessService();
        this.signUp = (0, async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { students, parent, emergencyContact } = req.body;
            const { mother = null, father = null } = parent, parentData = __rest(parent, ["mother", "father"]);
            // if parent email is already registered
            const user = yield user_repository_1.default.findByEmail(parent.email);
            if (user)
                throw new ApiError_1.BadRequestError('User already registered');
            const allGuardians = [];
            if (mother) {
                allGuardians.push(Object.assign(Object.assign({}, mother), { type: "MOTHER" }));
            }
            if (father) {
                allGuardians.push(Object.assign(Object.assign({}, father), { type: "FATHER" }));
            }
            const data = yield this.accessService.createParentUser(parentData, emergencyContact, students, allGuardians);
            new ApiResponse_1.SuccessResponse('Signup Successful', data).send(res);
        }));
        this.signIn = (0, async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const data = yield this.accessService.userLogin(email, password);
            new ApiResponse_1.SuccessResponse('Login Success', data).send(res);
        }));
    }
}
exports.AccessController = AccessController;
//# sourceMappingURL=access.controller.js.map