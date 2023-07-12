import Wallet, { WalletModel } from './Wallet';
import { InternalError } from '../../../core/ApiError';
import Logger from '../../../core/Logger'

export class WalletRepo {

  public static find(): Promise<Wallet[] | null> {
    return WalletModel.findMany({
      include: {
        user: true,
      }
    })
  }



  public static findById(id: string): Promise<Wallet | null> {
    return WalletModel.findFirst({
      where: { id },
      include: {
        user: true,
      }
    })
  }

  public static findByFirebaseId(userId: Wallet['userId']): Promise<Wallet | null> {
    return WalletModel.findFirst({
      where: { userId },
      include: {
        user: true,
      }
    })
  }

  public static findByUser(userId: Wallet['userId']): Promise<Wallet | null> {
    return WalletModel.findFirst({
      where: { userId },
      include: {
        user: true,
      }
    })
  }

  public static async create(userId: Wallet['userId']): Promise<{ wallet: Wallet | null }> {

    const wallet = await WalletModel.create({
      data: { userId, coins: 0 },
      include: {
        user: true,
      }
    });

    return { wallet };

  }

  public static async createByTransfer(userId: Wallet['userId'], amount: Wallet['coins']): Promise<{ wallet: Wallet | null }> {

    const wallet = await WalletModel.create({
      data: { userId, coins: amount },
      include: {
        user: true,
      }
    });

    return { wallet };

  }

  public static async update(userId: Wallet['userId'], wallet: Wallet['coins']): Promise<Wallet | null> {

    return WalletModel.update({
      where: { userId },
      data: { coins: { increment: wallet } },
      include: {
        user: true,
      }
    })
  }

  public static async decrementWalletCoins(userId: Wallet['userId'], coins: Wallet['coins']): Promise<Wallet | null> {
    return WalletModel.update({
      where: { userId },
      data: { coins: { decrement: coins } },
      include: {
        user: true,
      }
    })
  }

  public static async incrementWalletCoins(userId: Wallet['userId'], coins: Wallet['coins']): Promise<Wallet | null> {
    return WalletModel.update({
      where: { userId },
      data: { coins: { increment: coins } },
      include: {
        user: true,
      }
    })
  }

  // public static async decrementWalletGift(userId: Wallet['userId'], coins: Wallet['coins']): Promise<Wallet | null> {
  //   return WalletModel.update({
  //     where: { userId },
  //     data: { gifts: { decrement: coins } },
  //     include: {
  //       user: true,
  //     }
  //   })
  // }

  // public static async incrementWalletGift(userId: Wallet['userId'], coins: Wallet['coins']): Promise<Wallet | null> {
  //   return WalletModel.update({
  //     where: { userId },
  //     data: { gifts: { increment: coins } },
  //     include: {
  //       user: true,
  //     }
  //   })
  // }

  public static async delete(id: Wallet['id']): Promise<Wallet | null> {
    return WalletModel.delete({ where: { id } })
  }

}
