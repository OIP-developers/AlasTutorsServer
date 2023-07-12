
import Token, { TokenModel } from './Token';
import { Prisma } from '@prisma/client'

export default class TokenRepo {


  public static async create(token: Token): Promise<Token | null> {
    return TokenModel.create({
      data: token
    });
  }

  public static find({ userId, token, shot_code, type }: {
    userId: Token['userId'],
    token?: Token['token'],
    shot_code?: Token['shot_code'],
    type: Token['type']
  }): Promise<Token | null> {
    return TokenModel.findFirst({
      where: {
        userId,
        type,
        OR: [
          { shot_code },
          { token },
        ],
      }
    })
  }

  // public static findByCompany(id: Company['id']): Promise<Token[] | null> {
  //   return TokenModel.findMany({
  //     where: { company: { id } },
  //     include: { projects: true },
  //     orderBy: { createdAt: 'desc' }
  //   })
  // }

  // public static async update(id: Token['id'], token: Token): Promise<Token | null> {
  //   return TokenModel.update({
  //     where: { id },
  //     data: token
  //   });
  // }

  // public static async delete(id: Token['id']): Promise<Token | null> {
  //   return TokenModel.delete({
  //     where: { id }
  //   });
  // }

  public static findOne({ where }: { where: Prisma.TokenstoreWhereInput }): Promise<Token | null> {
    return TokenModel.findFirst({
      where,
      include: {
        user: {
          select: {
            email: true,
            id: true,
            first_name: true,
            last_name: true,
          }
        }
      }
    })
  }

}
