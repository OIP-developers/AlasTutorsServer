"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessRoutes = void 0;
const express_1 = require("express");
const access_controller_1 = require("./access.controller");
const validator_1 = __importDefault(require("../../../helpers/validator"));
const joi_schema_1 = require("../../../utils/joi.schema");
const authentication_1 = __importDefault(require("../../../middleware/authentication"));
const schema_1 = __importDefault(require("./schema"));
class AccessRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new access_controller_1.AccessController();
        this.initRoutes();
    }
    initRoutes() {
        this.router.post('/signup', 
        // validator(signupSchema),
        this.controller.signup);
        // this.router.post(
        //   '/driver/signup',
        //   validator(driverSignupSchema),
        //   this.controller.signupDriver
        // )
        this.router.post('/signin', (0, validator_1.default)(joi_schema_1.userCredential), this.controller.signin);
        this.router.get('/me', authentication_1.default, 
        // authorization(["ADMIN", "COMPANY_ADMIN", "ADMIN", "MANAGER", "ADMIN"]),
        this.controller.getMe);
        this.router.post('/user', 
        // authentication,
        // authorization(["COMPANY_ADMIN"]),
        // validator(employeeAddSchema),
        this.controller.addUser);
        this.router.get('/users', 
        // authentication,
        // authorization(["COMPANY_ADMIN", "ADMIN"]),
        this.controller.getUsers);
        // this.router.get(
        //   '/email/verify',
        //   // authentication,
        //   // authorization(["COMPANY_ADMIN", "ADMIN"]),
        //   this.controller.emailVerify
        // )
        // this.router.get(
        //   '/teachers',
        //   // authentication,
        //   // authorization(["COMPANY_ADMIN", "ADMIN"]),
        //   this.controller.getTeachers
        // )
        // this.router.get(
        //   '/refer/list',
        //   authentication,
        //   this.controller.getReferUser
        // )
        this.router.put('/users/:id', 
        // authentication,
        // authorization(["COMPANY_ADMIN", "ADMIN"]),
        // validator(employeeUpdateSchema),
        this.controller.updateUser);
        this.router.put('/update/me', authentication_1.default, 
        // authorization(["COMPANY_ADMIN", "ADMIN"]),
        // validator(employeeUpdateSchema),
        this.controller.updateMe);
        this.router.delete('/users/:id', authentication_1.default, 
        // authorization(["COMPANY_ADMIN", "ADMIN"]),
        this.controller.delete);
        // this.router.get(
        //   '/email-verify',
        //   this.controller.verifyEmail
        // )
        this.router.post('/phone-verify', authentication_1.default, this.controller.verifyPhone);
        this.router.get('/users/:id', 
        // authentication,
        // authorization([RoleEnum.ADMIN]),
        this.controller.getUserById);
        this.router.get('/email-verify', this.controller.verifyEmail);
        this.router.post('/forgot-password', (0, validator_1.default)(schema_1.default.forgotPassword), this.controller.forgotPassword);
        this.router.post('/reset-password', 
        // validator(schema.resetPassword),
        this.controller.resetPassword);
        // this.router.delete(
        //   '/signout',
        //   authentication,
        //   this.controller.signout
        // )
        // this.router.post(
        //   '/verify',
        //   authentication,
        //   this.controller.verify
        // )
        // this.router.post(
        //   '/refresh',
        //   authentication,
        //   validator(refreshToken),
        //   this.controller.refresh
        // )
        // this.router.post(
        //   '/forgot-password',
        //   // authentication,
        //   // validator(refreshToken),
        //   this.controller.forgotPassword
        // )
        this.router.post('/password-otp', 
        // authentication,
        // validator(refreshToken),
        this.controller.passwordOTPVerify);
        this.router.post('/password-verify', (0, validator_1.default)(joi_schema_1.verifyPassword), this.controller.verifyPassword);
        this.router.post('/forgot-password', 
        // authentication,
        // validator(refreshToken),
        this.controller.forgotPassword);
        this.router.post('/password-otp', 
        // authentication,
        // validator(refreshToken),
        this.controller.passwordOTPVerify);
        this.router.post('/password-verify', (0, validator_1.default)(joi_schema_1.verifyPassword), this.controller.verifyPassword);
        this.router.post('/reset-password', 
        // authentication,
        // validator(schema.resetPassword),
        this.controller.resetPassword);
    }
}
exports.AccessRoutes = AccessRoutes;
//# sourceMappingURL=access.routes.js.map