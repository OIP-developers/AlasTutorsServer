import { prisma, IPrisma, Invoice, Currency, InvoiceStatus } from '../../../database';

export const DOCUMENT_NAME = IPrisma.ModelName.Invoice;

export default Invoice;

export const InvoiceModel = prisma.invoice;
