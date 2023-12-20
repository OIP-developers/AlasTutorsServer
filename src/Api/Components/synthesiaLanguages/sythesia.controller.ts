import { Response, NextFunction } from "express"
import asyncHandler from "../../../helpers/async";
import { SuccessResponse } from '../../../core/ApiResponse';
import { NoDataError } from '../../../core/ApiError';
import _ from 'lodash';
import SynthesiaRepo from './synthesia.repository';

export class SynthesiaController {

  getAll = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const avatars = await SynthesiaRepo.find();
      if (!avatars) throw new NoDataError();
      new SuccessResponse('fetch successfully', avatars).send(res);
    }
  )

}
