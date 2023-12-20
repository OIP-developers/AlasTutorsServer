import { Response, NextFunction } from "express"
import asyncHandler from "../../../helpers/async";
// import UserRepo from '../../../database/repository/UserRepo';
// import { generateTokenKey } from "../../../helpers/tokenKeyGenerator";
// import User from '../../../database/model/User';
// import { RoleCode } from '../../../database/model/Role';
import { SuccessResponse, SuccessMsgResponse } from '../../../core/ApiResponse';
import { NoDataError, BadRequestError } from '../../../core/ApiError';
import _ from 'lodash';
// import { createTokens } from '../../../utils/authUtils';
// import KeystoreRepo from '../../../database/repository/KeystoreRepo';
// import { comparePassword } from "../../../utils/password";
import SubCategoryRepo from './subCategory.repository';

export class subCategoryController {

    getAll = asyncHandler(
        async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
            const buckets = await SubCategoryRepo.find(req.params.category);
            if (!buckets) throw new NoDataError();
            // await ApiResponseTime(req)
            new SuccessResponse('fetch successfully', buckets).send(res);
        }
    )

    add = asyncHandler(
        async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
            const { bucket } = await SubCategoryRepo.create(req.body);
            new SuccessResponse('Added successfully', bucket).send(res);
        }
    )

    delete = asyncHandler(
        async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
            const { bucket } = await SubCategoryRepo.delete(req.params._id);
            new SuccessResponse('deleted successfully', bucket).send(res);
        }
    )

    update = asyncHandler(
      async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
        const { bucket } = await SubCategoryRepo.updateCate(req.params._id, req.body)
        new SuccessResponse('update success', bucket).send(res);
      }
    )

}
