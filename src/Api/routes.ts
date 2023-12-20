import { Router } from 'express';
import { env } from '../config/globals';

import { registerApiRoutes } from './Components';
import registerErrorHandler from "../middleware/ErrorHandler"
import registerMiddleware from '../middleware/Register';
import { registerApiKey } from '../middleware/apikey';
import Logger from '../core/Logger';

/**
 * Init Express REST routes
 *
 * @param {Router} router
 * @returns {void}
 */

export function initRestRoutes(router: Router): void {
  const prefix = `/api/${env.API_VERSION}`;
  const appRoutesPrefix = `/api/app/${env.API_VERSION}`;
  Logger.info(`Initializing REST routes on ${prefix}`);
  registerMiddleware(router);
  registerApiRoutes(router, prefix, appRoutesPrefix);
  registerErrorHandler(router);

}
