import Invoice, { InvoiceModel } from './Invoice';
import { NoDataError, BadRequestError } from '../../../core/ApiError';

export default class InvoiceRepo {

  public static findById(id: string): Promise<Invoice | null> {
    return InvoiceModel
      .findUnique({
        where: { id },
        include: { order: true, user: true }
      })
  }

  public static findAll(query: Invoice): Promise<Invoice[]> {
    return InvoiceModel
      .findMany({
        where: { ...query, isDeleted: false },
        include: { order: true, user: true },
        orderBy: { createdAt: 'desc' }
      })
  }

  public static async create(body: Invoice): Promise<{ invoice: Invoice }> {
    const invoice = await InvoiceModel.create({
      data: body,
      include: {order: true, user: true},
    });
    return { invoice };
  }

  public static async updateByStripe(stripe: string, body: Invoice) { // Promise<{ invoice: Invoice }>
    const invoice = await InvoiceModel
      .update({
        where: { stripe },
        data: body,
        include: { order: true, user: true },
      })
    if (!invoice) throw new BadRequestError('invoice not found!');
    return { invoice };
  }

  public static async delete(stripe: string): Promise<{ invoice: Invoice }> {
    const invoice = await InvoiceModel.delete({ where: { stripe } });
    if (!invoice) throw new NoDataError();
    return { invoice };
  }

}
