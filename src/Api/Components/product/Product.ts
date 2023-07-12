import { prisma, IPrisma, Product } from '../../../database';

export const DOCUMENT_NAME = IPrisma.ModelName.Product;

export default Product;

export const ProductModel = prisma.product;
