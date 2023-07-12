import { prisma, IPrisma, Order } from '../../../database';

export const DOCUMENT_NAME = IPrisma.ModelName.Order;

export default Order;

export const OrderModel = prisma.order;
