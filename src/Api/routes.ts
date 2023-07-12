import { Router } from 'express';
import { env } from '../config/globals';

import { registerApiRoutes } from './Components';
import registerErrorHandler from "../middleware/ErrorHandler"
import registerMiddleware from '../middleware/Register';
import { registerApiKey } from '../middleware/apikey';
import { trackApiKey } from '../middleware/apiTrack';
import Logger from '../core/Logger';

/**
 * Init Express REST routes
 *
 * @param {Router} router
 * @returns {void}
 */

export function initRestRoutes(router: Router): void {
  const prefix: string = `/api/${env.API_VERSION}`;
  Logger.info(`Initializing REST routes on ${prefix}`);

  registerMiddleware(router);
  // registerApiKey(router, `${prefix}/auth`); // x-api-key for authentication
  // authentication(router, `${prefix}/auth`);
  trackApiKey(router, prefix);
  registerApiRoutes(router, prefix);
  registerErrorHandler(router);

}
