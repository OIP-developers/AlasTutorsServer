import DocumentModal, { Modal, IModal } from './Modal';
import DocumentAnswerModal, { AnswersModal, IAnswersModal } from './Answer';
import DocumentQuestionModal, { QuestionModal, IQuestionModal } from './Question';
import DocumentExpModal, { ExpressionModal, IExpressionModal } from './Expressions';
import DocumentViewsModal, { ViewsModal, IViewsModal } from './Views';
import DocumentNotesModal, { NotesModal, INotesModal } from './Notes';
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
      .findById(id, { isDeleted: false })
      .select("-isDeleted -updatedAt")
      .lean<DocumentModal[]>()
      .exec();
  }

  public static findByCourse(courseId: string): Promise<DocumentModal[]> {
    return Modal
      .find({ courseId }).sort("-index")
      .select("-isDeleted -updatedAt")
      .lean<DocumentModal[]>()
      .exec();
  }

  public static async create(body: IModal): Promise<{ data: DocumentModal }> {
    const data = await Modal.create({ ...body } as DocumentModal);
    return { data };
  }

  public static async delete(id: string): Promise<{ data: DocumentModal }> {
    const data = await Modal.findByIdAndDelete(id, { new: true });
    if (!data) throw new NoDataError();
    return { data };
  }

  public static async deleteMany(query: any): Promise<{ data: any }> {
    const data = await Modal.deleteMany({...query});
    if (!data) throw new NoDataError();
    return { data };
  }

  public static async update(id: string, body: IModal): Promise<{ data: any }> {
    const data = await Modal.findByIdAndUpdate(id, { ...body } as DocumentModal, { new: true, runValidators: true });
    if (!data) throw new NoDataError();
    return { data };
  }

  //Expression
  public static async createExpression(body: IExpressionModal): Promise<{ data: DocumentExpModal }> {
    const data = await ExpressionModal.create({ ...body } as DocumentExpModal);
    return { data };
  }

  public static async findOneExpression(filter: IExpressionModal): Promise<DocumentExpModal> {
    return await ExpressionModal.findOne({ ...filter } as IExpressionModal)
    .populate("video")
    .lean<DocumentExpModal>()
    .exec()
  }

  public static async deleteExpression(id: string): Promise<{ data: DocumentExpModal }> {
    const data = await ExpressionModal.findByIdAndDelete(id, { new: true });
    if (!data) throw new NoDataError();
    return { data };
  }

  public static async updateExpression(id: string, body: IExpressionModal): Promise<{ data: any }> {
    const data = await ExpressionModal.findByIdAndUpdate(id, { ...body } as DocumentExpModal, { new: true, runValidators: true });
    if (!data) throw new NoDataError();
    return { data };
  }

  //View
  public static async createView(body: IViewsModal): Promise<{ data: DocumentViewsModal }> {
    const data = await ViewsModal.create({ ...body } as DocumentViewsModal);
    return { data };
  }
  //Answer
  public static async createAnswer(body: IAnswersModal): Promise<{ data: DocumentAnswerModal }> {
    const data = await AnswersModal.create({ ...body } as DocumentAnswerModal);
    return { data };
  }
  //Question
  public static async createQuestion(body: IQuestionModal): Promise<{ data: DocumentQuestionModal }> {
    const data = await QuestionModal.create({ ...body } as DocumentQuestionModal);
    return { data };
  }
  //Notes
  public static async createNote(body: INotesModal): Promise<{ data: DocumentNotesModal }> {
    const data = await NotesModal.create({ ...body } as DocumentNotesModal);
    return { data };
  }

}
