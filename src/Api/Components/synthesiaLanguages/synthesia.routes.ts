import { Router } from 'express';
import { SynthesiaController } from './sythesia.controller';
import authentication from '../../../middleware/authentication';

export class Routes {

  readonly router: Router = Router();
  readonly controller: SynthesiaController = new SynthesiaController()

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {

    this.router.get(
      '/',
      authentication,
      this.controller.getAll
    )

  }

}
