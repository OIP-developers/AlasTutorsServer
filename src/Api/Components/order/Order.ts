import { prisma, IPrisma, Order } from "../../../database";

export const DOCUMENT_NAME = IPrisma.ModelName.Order;
export const COLLECTION_NAME = "Orders";

export default Order;

export const OrderModel = prisma.order;
export const OrderItemsModel = prisma.orderItems;