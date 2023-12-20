import DocumentModal, { WorkspaceFolderModal as Modal , IWorkspaceFolderModal } from './workspaceFolder';
import { NoDataError } from '../../../../core/ApiError';
import { Schema } from 'mongoose';

export class Repository {

  public static find(query? : any): Promise<DocumentModal[]> {
    return Modal
      .find({...query})
      .select("-isDeleted -updatedAt")
      .lean<DocumentModal[]>()
      .exec();
  }

  public static findById(id: Schema.Types.ObjectId): Promise<DocumentModal> {
    return Modal
      .findById(id)
      .select("-isDeleted -updatedAt")
      .lean<DocumentModal>()
      .exec();
  }

  public static async create(body: DocumentModal): Promise<{ data: DocumentModal }> {
    const data = await Modal.create({ ...body } as DocumentModal);
    return { data };
  }

  public static async exists(body: IWorkspaceFolderModal): Promise<{ data: any }> {
    const data = await Modal.exists({ ...body } as IWorkspaceFolderModal);
    return { data };
  }

  public static async delete(id: string): Promise<{ data: DocumentModal }> {
    const data = await Modal.findByIdAndDelete(id, { new: true });
    if (!data) throw new NoDataError();
    return { data };
  }

  public static async deleteMany(body: any): Promise<{ data: any }> {
    const data = await Modal.deleteMany({ ...body })
    if (!data) throw new NoDataError();
    return { data };
  }


  public static async update(id: string, body: DocumentModal): Promise<{ data: any }> {
    const data = await Modal.findByIdAndUpdate(id, { ...body } as DocumentModal, { new: true, runValidators: true });
    if (!data) throw new NoDataError();
    return { data };
  }

}
