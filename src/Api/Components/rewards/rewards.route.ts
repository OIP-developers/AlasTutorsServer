import { Router } from "express";
import { rewardsController } from "./rewards.controller";

export class rewardsRoutes {
  readonly router: Router = Router();
  readonly controller: rewardsController = new rewardsController()

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.get(
      '/',
      this.controller.get
    )

    this.router.post(
      '/add',
      this.controller.add
    )
  }
}