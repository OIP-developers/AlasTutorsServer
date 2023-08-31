import { Request } from 'express';
import User from '../Api/Components/access/User';
import Company from '../Api/Components/company/Company';
import Keystore from '../Api/Components/access/Keystore';
import { Role } from '@prisma/client';

type UserRole = {
  role : Role
}
declare global {
  namespace Express {
    interface Request {
      user: User & UserRole;
      accessToken:string
      keystore:string
    }
  }
}

declare interface PublicRequest extends Request {}

declare interface RoleRequest extends PublicRequest {}

declare interface ProtectedRequest extends RoleRequest {
  user: User;
  company: Company
  accessToken: string;
  keystore: Keystore;
}

declare interface Tokens {
  accessToken: string;
  refreshToken: string;
}
