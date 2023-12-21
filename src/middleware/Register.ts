import express, { Router } from 'express';
import cors from "cors";
import helmet from "helmet";
import compression from "compression"
import cookieParser from "cookie-parser";
import session from "express-session"
import { corsUrl, environment } from '../config/globals';
import { env } from '../config/globals';
import { Request, Response, NextFunction } from 'express'

const registerMiddleware = (router: Router): void => {

  router.use(cors({ origin: '*' }));
  router.use(helmet());
  router.use(compression());
  router.use(express.json());
  router.use(cookieParser());
}

export default registerMiddleware
