import { Router } from 'express';
import passport from 'passport';
// @ts-ignore
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import cookieSession from "cookie-session"
import { AccessController } from './access.controller';
import validator, { ValidationSource } from '../../../validations/validator';
import { signupSchema, userCredential, refreshToken } from "../../../utils/joi.schema"
import schema from './schema'
import authentication from '../../../middleware/authentication';
import { google_auth, facebook_auth } from '../../../config/globals';
import { AppSigninValidationSchema } from '../../../validations/payloadSchema/AccessSchema';
// import authorization from '../../../middleware/authorization';
// import "../../../auth/facebook-authenticate"
// import "../../../auth/facebook-tellegram"

export class AccessAppRoutes {

  readonly router: Router = Router();
  readonly controller: AccessController = new AccessController()
 
  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {

    this.router.post(
      '/signin',
      validator(AppSigninValidationSchema),
      this.controller.appSignin
    )

  }

}
