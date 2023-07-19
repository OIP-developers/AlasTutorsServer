"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRoutes = void 0;
const express_1 = require("express");
const cart_controller_1 = require("./cart.controller");
const validator_1 = __importDefault(require("../../../helpers/validator"));
const authentication_1 = __importDefault(require("../../../middleware/authentication"));
const schema_1 = __importDefault(require("./schema"));
class CartRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new cart_controller_1.CartController();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/:id', this.controller.getById);
        // this.router.get(
        //   '/',
        //   this.controller.getAll
        // )
        this.router.post('/', authentication_1.default, 
        // authorization(["USER"]),
        (0, validator_1.default)(schema_1.default.create), this.controller.create);
        this.router.put('/:id', authentication_1.default, 
        // authorization(["USER"]),
        (0, validator_1.default)(schema_1.default.create), this.controller.update);
        this.router.delete('/:id', authentication_1.default, 
        // authorization(["USER"]),
        this.controller.delete);
    }
}
exports.CartRoutes = CartRoutes;
//# sourceMappingURL=cart.routes.js.map