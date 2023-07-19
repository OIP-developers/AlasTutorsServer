"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleRoutes = void 0;
const express_1 = require("express");
const example_controller_1 = require("./example.controller");
const validator_1 = __importDefault(require("../../../helpers/validator"));
const authentication_1 = __importDefault(require("../../../middleware/authentication"));
const authorization_1 = __importDefault(require("../../../middleware/authorization"));
const schema_1 = __importDefault(require("./schema"));
const Role_1 = require("../roles/Role");
class ExampleRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new example_controller_1.ExampleController();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/:id', this.controller.getById);
        this.router.get('/', this.controller.getAll);
        this.router.post('/', authentication_1.default, (0, authorization_1.default)([Role_1.RoleEnum.ADMIN]), (0, validator_1.default)(schema_1.default.create), this.controller.create);
        this.router.put('/:id', authentication_1.default, (0, authorization_1.default)([Role_1.RoleEnum.ADMIN]), this.controller.update);
        this.router.delete('/:id', authentication_1.default, (0, authorization_1.default)([Role_1.RoleEnum.ADMIN]), this.controller.delete);
    }
}
exports.ExampleRoutes = ExampleRoutes;
//# sourceMappingURL=example.routes.js.map