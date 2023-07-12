import { prisma, IPrisma, ProductTag } from '../../../database';

export const DOCUMENT_NAME = IPrisma.ModelName.ProductImage;

export default ProductTag;

export const ProductImageModel = prisma.productTag;
