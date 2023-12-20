import Joi from 'joi';
import { JoiObjectId, JoiUrlEndpoint } from '../../../validations/validator';

export default {
  paramsId: Joi.object().keys({
    _id: JoiObjectId().optional(),
  }),
  // pagination: Joi.object().keys({
  //   pageNumber: Joi.number().required().integer().min(1),
  //   pageItemCount: Joi.number().required().integer().min(1),
  // }),
  create: Joi.object().keys({
    file: Joi.string().required(),
  }),
  addComment: Joi.object().keys({
    comment: Joi.string().required(),
    // commentBy: Joi.string().required(),
  }),
  addreply: Joi.object().keys({
    answer: Joi.string().required(),
    commentId: Joi.string().optional(),
  }),
  addLike: Joi.object().keys({
    // answer: Joi.string().required(),
    commentId: Joi.string().optional(),
  })
  // createFolder: Joi.object().keys({
  //   name: Joi.string().required(),
  //   workspace: Joi.string().required(),
  // }),
  // createFile: Joi.object().keys({
  //   name: Joi.string().required(),
  //   url: Joi.string().required(),
  //   size: Joi.number().required(),
  //   type: Joi.string().required(),
  //   folder: Joi.string().required(),
  //   workspace: Joi.string().required(),
  // }),
};
