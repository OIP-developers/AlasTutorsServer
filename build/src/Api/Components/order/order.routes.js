"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const authentication_1 = __importDefault(require("../../../middleware/authentication"));
class OrderRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.Controller = new order_controller_1.OrderController();
        this.initRoutes();
    }
    initRoutes() {
        this.router.post("/", authentication_1.default, this.Controller.create);
        // this.router.get(
        //   "/",
        //   authentication,
        //   this.Controller.getAll
        // );
        // this.router.get(
        //   "/:id",
        //   authentication,
        //   this.Controller.getById
        // );
        // this.router.put(
        //   "/users/place",
        //   authentication,
        //   this.Controller.UpdateUserPlaceOrder
        // );
        // this.router.get(
        //   "/users/checkout",
        //   authentication,
        //   this.Controller.getByUserId
        // );
        // this.router.put(
        //   "/status/:id",
        //   authentication,
        //   validator(schema.statusUpdate),
        //   this.Controller.statusUpdate
        // );
        // this.router.put(
        //   "/manufacturer/:id",
        //   authentication,
        //   validator(schema.manufacturerUpdate),
        //   this.Controller.updateOrderByManufacturer
        // );
        // this.router.put(
        //   "/employee/:id",
        //   authentication,
        //   validator(schema.employeeUpdate),
        //   this.Controller.updateOrderByEmployee
        // );
        // this.router.put(
        //   "/customer/:id",
        //   authentication,
        //   // authorization([RoleEnum.CUSTOMER]),
        //   this.Controller.updateOrderByCustomer
        // );
        // this.router.get(
        //   "/employee/review",
        //   authentication,
        //   this.Controller.reviewManufacturerEdits
        // );
        // this.router.delete(
        //   "/:id",
        //   authentication,
        //   this.Controller.delete
        // );
        // this.router.get(
        //   "/all/vendor",
        //   authentication,
        //   this.Controller.getOrderByVendorId
        // );
    }
}
exports.OrderRoutes = OrderRoutes;
//# sourceMappingURL=order.routes.js.map