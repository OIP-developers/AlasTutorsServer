import express from 'express';
import { ProtectedRequest } from 'app-request';
import { AuthFailureError } from '../core/ApiError';
import RoleRepo from '../database/repository/RoleRepo';
import asyncHandler from '../helpers/asyncHandler';
import Role from '../database/model/Role';

export default function authorization(allow_roles: Role['code'][]) {
  return asyncHandler(async (req: any, res, next) => {

    if (!req.user || !req.user.role)
      throw new AuthFailureError('Permission denied');

    const role = await RoleRepo.findByCode(req.user.role.code);

    if (!role) throw new AuthFailureError("You don't have access to this action");

    if (!allow_roles.includes(role?.code)) throw new AuthFailureError("Role wrong");

    return next()

  })
}
