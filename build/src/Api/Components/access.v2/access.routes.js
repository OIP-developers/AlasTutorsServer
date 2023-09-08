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
class AccessRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new access_controller_1.AccessController();
        this.initRoutes();
    }
    initRoutes() {
        this.router.post('/signup', (0, validator_1.default)(joi_schema_1.signUpSchema), this.controller.signUp);
        this.router.post('/signin', (0, validator_1.default)(joi_schema_1.userCredential), this.controller.signIn);
    }
}
exports.AccessRoutes = AccessRoutes;
//# sourceMappingURL=access.routes.js.map