
import { Prisma } from '@prisma/client';
import Product, { ProductModel } from './Product';

export class ProductRepo {

  public static findById({ where }: { where: Prisma.ProductWhereUniqueInput }) {
    return ProductModel.findUnique({ where })
  }

  public static findOne({ where }: { where: Prisma.ProductWhereInput }) {
    return ProductModel.findFirst({ where: { ...where } })
  }

  public static find({ where }: { where: Prisma.ProductWhereInput }) {
    return ProductModel.findMany({
      where: { isDeleted: false }, include: {
        categories: true
      }, orderBy: { createdAt: 'desc' }
    })
  }
  public static async create({ body, categories }: { body: Product, categories: string[] }) {
    return ProductModel.create({
      data: {
        title: body.title,
        price: body.price,
        desc: body.desc,
        featured_image: body.featured_image,
        categories: {
          create: categories.map((categoryId) => {
            return {
              categoryId
            }
          })
        }
      },
      include: {
        categories: true
      }
    });
  }

  public static async update(
    { id, body, categories }: { id: Product['id'], body: Product, categories: string[] }
  ) {
    return ProductModel.update({
      where: {
        id
      },
      data: {
        title: body.title,
        price: body.price,
        desc: body.desc,
        featured_image: body.featured_image,
        categories: {
          deleteMany: {
            productId: id
          },
          create: categories.map((categoryId) => {
            return { categoryId }
          })
        }
      },
      include: {
        categories: true
      }
    });
  }

  public static async delete(id: Product['id']) {
    return ProductModel.delete({
      where: { id }
    });
  }

}
