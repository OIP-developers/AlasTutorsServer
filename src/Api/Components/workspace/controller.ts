import { Response, NextFunction } from "express"
import asyncHandler from "../../../helpers/async";
import { SuccessResponse, FailureMsgResponse } from '../../../core/ApiResponse';
import { NoDataError } from '../../../core/ApiError';
import _ from 'lodash';
import { Repository } from './repository';
import { Repository as workspaceFolderRepo } from './workspaceFolders/repository';
import { Repository as workspaceFileRepo } from './workspaceFiles/repository';
import { Repository as FileCommentsRepository } from '../comments/repository';
import { Repository as workspaceFavFolderRepo } from './workspaceFavFolders/repository';
import { Repository as workspaceFavFilesRepo } from './workspaceFavFiles/repository';
import { Repository as WorkspaceAgenda } from '../agenda/repository';
import { WorkspaceService } from "./workspace.service"

import { Repository as workspaceFolderRepo } from './workspaceFolders/repository';
import { Repository as workspaceFileRepo } from './workspaceFiles/repository';
import { Repository as workspaceFavFolderRepo } from './workspaceFavFolders/repository';
import { Repository as workspaceFavFilesRepo } from './workspaceFavFiles/repository';

export class Controller {

  service = new WorkspaceService()

  getAll = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const data = await Repository.find();
      if (!data) throw new NoDataError();
      new SuccessResponse('fetch successfully', { entities: data }).send(res);
    }
  )

  getById = asyncHandler(
    async (req: any, res: any, next: NextFunction): Promise<Response | void> => {
      const user = req.user
      const data = await Repository.findByIdWithAssets(req.params._id, user._id);
      if (!data) throw new NoDataError();
      new SuccessResponse('Fetch successfully', { entities: data[0] }).send(res);
    }
  )

  add = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const hosts = req.body?.hosts
      const listeners = req.body?.listeners
      const { data } = await Repository.create({ ...req.body, business: req.user.business._id });
      console.log(data._id)
      if (listeners && listeners?.length) await this.service.createListeners(listeners, data)
      if (hosts && hosts?.length) await this.service.createHosts(hosts, data)
      const body = { workspace: data._id as string }
      data != null ? await WorkspaceAgenda.create(body) : null
      new SuccessResponse('Workspace Created Successfully', { entity: data }).send(res);
    }
  )

  delete = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { data } = await Repository.delete(req.params._id);
      // const folders = (await workspaceFolderRepo.find({ workspace: data._id })).map(folders => folders._id.toString())
      new SuccessResponse('deleted successfully', { entity: data }).send(res);
    }
  )

  update = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { data } = await Repository.update(req.params._id, req.body)
      new SuccessResponse('update success', { entity: data }).send(res);
    }
  )


  //Workspace Folder

  deleteFolder = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { data } = await workspaceFolderRepo.delete(req.params._id);
      const files = (await workspaceFileRepo.find({ folder: data._id })).map(files => files._id.toString())

      await this.service.deleteFolderChildren(files, data._id)

      new SuccessResponse('Deleted successfully', { entity: data }).send(res);
    }
  )

  addFolder = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { data: folderExist } = await workspaceFolderRepo.exists({ ...req.body })
      if (folderExist) throw new FailureMsgResponse(`Folder with name '${req.body.name}' already exist in this workspace`).send(res)
      const { data } = await workspaceFolderRepo.create({ ...req.body });
      new SuccessResponse('Workspace Folder Created Successfully', { entity: data }).send(res);
    }
  )

  updateFolder = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { data } = await workspaceFolderRepo.update(req.params._id, req.body)
      new SuccessResponse('Update success', { entity: data }).send(res);
    }
  )

  favouriteFolder = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {

      const user = req.user

      const favoriteExists = await workspaceFavFolderRepo.findOne({ folder: req.body.folder, user: user._id })

      if (!favoriteExists) {
        const { data } = await workspaceFavFolderRepo.create({ ...req.body, user: user._id })
        return new SuccessResponse('Favorite Added Successfully', { entity: data }).send(res);
      }

      const { data } = await workspaceFavFolderRepo.delete(favoriteExists._id)
      new SuccessResponse('Favorite Removed Successfully', { entity: data }).send(res);
    }
  )

  //Workspace File

  getFile = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const data = await workspaceFileRepo.findWorkspaceFileById(req.params._id);
      if (!data.length) throw new NoDataError();
      new SuccessResponse('Fetch successfully', { entities: data[0] }).send(res);
    }
  )

  addFile = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
      const { data } = await workspaceFileRepo.create(req.body);
      const file = { file: data._id as string, fileType: 'file' }
      const agenda = { file: data._id as string, fileType: 'agenda' }
      await FileCommentsRepository.create(file)
      await FileCommentsRepository.create(agenda)
      new SuccessResponse('Workspace File Created Successfully', { entity: data }).send(res);
    }
  )

  favouriteFile = asyncHandler(
    async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {

      const user = req.user

      const favoriteExists = await workspaceFavFilesRepo.findOne({ file: req.body.file, folder: req.body.folder, user: user._id })

      if (!favoriteExists) {
        const { data } = await workspaceFavFilesRepo.create({ ...req.body, user: user._id })
        return new SuccessResponse('Favorite Added Successfully', { entity: data }).send(res);
      }

      const { data } = await workspaceFavFilesRepo.delete(favoriteExists._id)
      new SuccessResponse('Favorite Removed Successfully', { entity: data }).send(res);
    }
  )

}
