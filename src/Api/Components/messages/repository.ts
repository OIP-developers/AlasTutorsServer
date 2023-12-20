import DocumentModal, { Modal } from './Modal';
import { NoDataError } from '../../../core/ApiError';
import { Schema } from 'mongoose';

export class Repository {

  public static find(): Promise<DocumentModal[]> {
    return Modal
      .find({ isDeleted: false })
      .select("-isDeleted -updatedAt")
      .lean<DocumentModal[]>()
      .exec();
  }

  public static findById(id: Schema.Types.ObjectId): Promise<DocumentModal[]> {
    return Modal
      .find({ workspace: id })
      .populate({
        path: "user reply.replyBy",
        select: "_id first_name last_name profilePicUrl" // select specific fields from hosts and listeners objects
      })
      .select("-isDeleted -updatedAt")
      .lean<DocumentModal[]>()
      .exec();
  }
  public static async addReply(id: Schema.Types.ObjectId, body: DocumentModal): Promise<{ data: any }> {
    const data = await Modal.findOneAndUpdate(
      { _id: id },
      { $push: { reply: body } },
      { new: true, runValidators: true });
    if (!data) throw new NoDataError();
    return { data };
  }
  public static async addLike(id: Schema.Types.ObjectId, replyId: string, body: DocumentModal): Promise<{ data: any }> {
    const data = await Modal.findOneAndUpdate(
      { _id: id, "reply._id": replyId },
      { $push: { "reply.$.like": body } },
      { new: true, runValidators: true });
    if (!data) throw new NoDataError();
    return { data };
  }

  public static async create(body: DocumentModal): Promise<{ data: DocumentModal }> {
    const data = await Modal.create({ ...body } as DocumentModal);
    return { data };
  }

  public static async delete(id: string): Promise<{ data: DocumentModal }> {
    const data = await Modal.findByIdAndDelete(id, { new: true });
    if (!data) throw new NoDataError();
    return { data };
  }

  public static async update(id: string, body: DocumentModal): Promise<{ data: any }> {
    const data = await Modal.findByIdAndUpdate(id, { ...body } as DocumentModal, { new: true, runValidators: true });
    if (!data) throw new NoDataError();
    return { data };
  }

}
