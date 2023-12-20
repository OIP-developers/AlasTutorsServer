import DocumentModal, { Modal } from './Modal';
import { NoDataError } from '../../../core/ApiError';
import { Schema } from 'mongoose';

export class Repository {

  public static find(): Promise<DocumentModal[]> {
    return Modal
      .find()
      // .select("-isDeleted -updatedAt")
      .lean<DocumentModal[]>()
      .exec();
  }

  public static findById(id: Schema.Types.ObjectId): Promise<DocumentModal> {
    return Modal
      .findById(id)
      // .select("-isDeleted -updatedAt")
      .lean<DocumentModal>()
      .exec();
  }

  public static async create(body: DocumentModal | any): Promise<{ data: DocumentModal }> {
    const data = await Modal.create({ ...body } as DocumentModal);
    return { data };
  }

  public static async delete(id: string): Promise<{ data: DocumentModal }> {
    const data = await Modal.findByIdAndDelete(id, { new: true });
    if (!data) throw new NoDataError();
    return { data };
  }
  public static async deleteAgenda(id: Schema.Types.ObjectId, agendaId: string): Promise<{ data: DocumentModal }> {
    const data = await Modal.findByIdAndUpdate(
      id,
      { $pull: { agenda: { _id: agendaId } } },
      { new: true }
    );
    if (!data) throw new NoDataError();
    return { data };
  }

  public static async update(id: Schema.Types.ObjectId, body: DocumentModal): Promise<{ data: any }> {
    const data = await Modal.findOneAndUpdate(
      { workspace: id },
      { $push: { agenda: body } },
      { new: true, runValidators: true });
    if (!data) throw new NoDataError();
    return { data };
  }
  public static async updateCount(id: string, answerId: string, answerBy: string): Promise<{ data: any }> {
    const data = await Modal.findByIdAndUpdate(
      id,
      {
        $inc: { 'answers.$[elem].count': 1 },
        $set: {
          updatedAt: new Date(),
          'answers.$[elem].answerBy': answerBy
        }
      },
      { arrayFilters: [{ 'elem._id': answerId }], new: true, runValidators: true },
    )
    if (!data) throw new NoDataError();
    return { data };
  }

}
