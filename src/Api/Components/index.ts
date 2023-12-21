import { NextFunction, Request, Response, Router } from 'express';

import { AccessRoutes } from './access/access.routes';
import { NotFoundError } from '../../core/ApiError';

export const registerApiRoutes = (router: Router, prefix = ''): void => {

  router.get(prefix, (req: Request, res: Response) => res.send('Alas tutor ❤'));
  router.use(`${prefix}`, new AccessRoutes().router)

  router.use((req: Request, res: Response, next: NextFunction) => next(new NotFoundError()));
}
