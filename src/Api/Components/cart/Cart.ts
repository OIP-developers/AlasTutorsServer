import { prisma, IPrisma, Cart } from '../../../database';

export const DOCUMENT_NAME = IPrisma.ModelName.Cart;

export default Cart;

export const CartModel = prisma.cart;
