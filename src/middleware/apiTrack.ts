import { Router, Response, NextFunction } from 'express';
import ApiKeyRepo from '../Api/Components/access/apiKey.repository';

import asyncHandler from '../helpers/async';
import Logger from '../core/Logger';

export const trackApiKey = (router: Router, endoint: string): void => {

  router.use(
    endoint,
    asyncHandler(async (req: any, res: Response, next: NextFunction) => {

      Logger.info(`${req.method}: ${req.url}`)
      return next();
    }),
  );

}