import DocumentModal, { Modal } from './Modal';
import { NoDataError } from '../../../core/ApiError';
import { Schema } from 'mongoose';

export class Repository {

  public static find(): Promise<DocumentModal[]> {
    return Modal
      .find()
      .lean<DocumentModal[]>()
      .exec();
  }

  public static findById(id: Schema.Types.ObjectId): Promise<DocumentModal> {
    return Modal
      .findOne({ file: id })
      .lean<DocumentModal>()
      .exec();
  }

  public static async create(body: DocumentModal | any): Promise<{ data: DocumentModal }> {
    const data = await Modal.create({ ...body } as DocumentModal);
    return { data };
  }

  public static async delete(id: Schema.Types.ObjectId, commentId: string): Promise<{ data: DocumentModal }> {
    const data = await Modal.findByIdAndUpdate(
      id,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );
    if (!data) throw new NoDataError();
    return { data };
  }

  public static async deleteMany(body: any): Promise<{ data: any }> {
    const data = await Modal.deleteMany({ ...body })
    if (!data) throw new NoDataError();
    return { data };
  }

  public static async update(id: Schema.Types.ObjectId, body: DocumentModal): Promise<{ data: any }> {
    const data = await Modal.findByIdAndUpdate(
      id,
      { $push: { comments: body } },
      { new: true, runValidators: true });
    if (!data) throw new NoDataError();
    return { data };
  }

  public static async updateAnnotation(id: Schema.Types.ObjectId, body: DocumentModal): Promise<{ data: any }> {
    const data = await Modal.findByIdAndUpdate(
      id,
      { $push: { annotation: body } },
      { new: true, runValidators: true });
    if (!data) throw new NoDataError();
    return { data };
  }

  public static async addReply(id: Schema.Types.ObjectId, commentId: string, body: DocumentModal): Promise<{ data: any }> {
    const data = await Modal.findOneAndUpdate(
      { _id: id, "comments._id": commentId },
      { $push: { "comments.$.reply": body } },
      { new: true, runValidators: true });
    if (!data) throw new NoDataError();
    return { data };
  }

  public static async addLike(id: Schema.Types.ObjectId, commentId: string, body: DocumentModal): Promise<{ data: any }> {
    const data = await Modal.findOneAndUpdate(
      { _id: id, "comments._id": commentId },
      { $push: { "comments.$.like": body } },
      { new: true, runValidators: true });
    if (!data) throw new NoDataError();
    return { data };
  }

  public static async removeReply(id: Schema.Types.ObjectId, commentId: string, replyId: string): Promise<{ data: any }> {
    const data = await Modal.findOneAndUpdate(
      { _id: id, "comments._id": commentId },
      { $pull: { "comments.$.reply": { _id: replyId } } },
      { new: true, runValidators: true });
    if (!data) throw new NoDataError();
    return { data };
  }

  public static async removeLike(id: Schema.Types.ObjectId, commentId: string, likeId: string): Promise<{ data: any }> {
    const data = await Modal.findOneAndUpdate(
      { _id: id, "comments._id": commentId },
      { $pull: { "comments.$.like": { _id: likeId } } },
      { new: true, runValidators: true });
    if (!data) throw new NoDataError();
    return { data };
  }

  public static async updateCount(id: Schema.Types.ObjectId, answerId: string): Promise<{ data: any }> {
    const data = await Modal.findByIdAndUpdate(
      id,
      { $inc: { 'answers.$[elem].count': 1 }, $set: { updatedAt: new Date() } },
      { arrayFilters: [{ 'elem._id': answerId }], new: true, runValidators: true },
    )
    if (!data) throw new NoDataError();
    return { data };
  }

}
