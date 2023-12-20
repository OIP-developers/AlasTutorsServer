import Modal from "./Modal"
import { Repository as WorkspacesUsersRepo } from "../workspaceUsers/repository"
import { WORKSPACE_ROLE } from "../workspaceUsers/Modal"
import { Repository as workspaceFolderRepo } from './workspaceFolders/repository';
import { Repository as workspaceFileRepo } from './workspaceFiles/repository';
import { Repository as FileCommentsRepository } from '../comments/repository';
import { Repository as workspaceFavFolderRepo } from './workspaceFavFolders/repository';
import { Repository as workspaceFavFilesRepo } from './workspaceFavFiles/repository';
import { Schema } from "mongoose";

export class WorkspaceService {

  async createListeners(listeners: string[], workspace: Modal) {

    for (const listener of listeners) {
      await WorkspacesUsersRepo.create({ workspace: workspace._id, user: listener, role: WORKSPACE_ROLE.LISTENER })
    }

  }

  async createHosts(hosts: string[], workspace: Modal) {

    for (const host of hosts) {
      await WorkspacesUsersRepo.create({ workspace: workspace._id, user: host, role: WORKSPACE_ROLE.HOST })
    }

  }

  async deleteFolderChildren(files: string[], parentId: Schema.Types.ObjectId) {

    if (files.length) await workspaceFavFolderRepo.deleteMany({ folder: parentId }) //Delete All Folder Favorites
    if (files.length) await workspaceFavFilesRepo.deleteMany({ folder: parentId }) //Delete All Files Favorites
    if (files.length) await workspaceFileRepo.deleteMany({ folder: { $in: files } }) //Delete All Files
    if (files.length) await FileCommentsRepository.deleteMany({ file: { $in: files } }) //Delete All Files Comments

  }

  async deleteWorkspaceChildren(files: string[], parentId: Schema.Types.ObjectId) {

    if (files.length) await workspaceFolderRepo.deleteMany({ workspace: parentId }) //Delete All Folder Favorites
    if (files.length) await workspaceFavFolderRepo.deleteMany({ folder: parentId }) //Delete All Folder Favorites
    if (files.length) await workspaceFavFilesRepo.deleteMany({ folder: parentId }) //Delete All Files Favorites
    if (files.length) await workspaceFileRepo.deleteMany({ folder: { $in: files } }) //Delete All Files
    if (files.length) await FileCommentsRepository.deleteMany({ file: { $in: files } }) //Delete All Files Comments

  }


}
