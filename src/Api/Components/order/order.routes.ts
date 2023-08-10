import { Router } from "express";
import { OrderController } from "./order.controller";
import validator from "../../../helpers/validator";
import schema from "./schema";
// import authorization from "../../../middlewares/authorization";
// import authentication from "../../../middlewares/authentication";
import { RoleEnum } from "../roles/Role";
import authentication from "../../../middleware/authentication";

export class OrderRoutes {
  readonly router: Router = Router();
  readonly Controller: OrderController = new OrderController();
  constructor() {
    this.initRoutes();
  }
  initRoutes(): void {
    this.router.post(
      "/",
      authentication,
      this.Controller.create
    );

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
