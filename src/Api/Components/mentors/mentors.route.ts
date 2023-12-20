import { Router } from "express";
import { mentorsController } from "./mentors.controller";

export class mentorsRoutes {
  readonly router: Router = Router();
  readonly controller: mentorsController = new mentorsController()

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {
    this.router.get(
      '/',
      this.controller.get
    )

    this.router.get(
      '/mentor',
      this.controller.getOne
    )

    this.router.get(
      '/incomingMentorshipRequests',
      this.controller.getIncomingMentorshipRequests
    )

    this.router.post(
      '/add',
      this.controller.add
    )

    this.router.post(
      '/applyMentorship',
      this.controller.applyMentorship
    )

    this.router.post(
      '/acceptMentorship',
      this.controller.acceptMentorship
    )

    this.router.post(
      '/ignoreMentorship',
      this.controller.ignoreMentorship
    )
  }
}