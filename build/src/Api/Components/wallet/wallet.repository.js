"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletRepo = void 0;
const Wallet_1 = require("./Wallet");
class WalletRepo {
    static find() {
        return Wallet_1.WalletModel.findMany({
            include: {
                user: true,
            }
        });
    }
    static findById(id) {
        return Wallet_1.WalletModel.findFirst({
            where: { id },
            include: {
                user: true,
            }
        });
    }
    static findByFirebaseId(userId) {
        return Wallet_1.WalletModel.findFirst({
            where: { userId },
            include: {
                user: true,
            }
        });
    }
    static findByUser(userId) {
        return Wallet_1.WalletModel.findFirst({
            where: { userId },
            include: {
                user: true,
            }
        });
    }
    static create(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const wallet = yield Wallet_1.WalletModel.create({
                data: { userId, coins: 0 },
                include: {
                    user: true,
                }
            });
            return { wallet };
        });
    }
    static createByTransfer(userId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const wallet = yield Wallet_1.WalletModel.create({
                data: { userId, coins: amount },
                include: {
                    user: true,
                }
            });
            return { wallet };
        });
    }
    static update(userId, wallet) {
        return __awaiter(this, void 0, void 0, function* () {
            return Wallet_1.WalletModel.update({
                where: { userId },
                data: { coins: { increment: wallet } },
                include: {
                    user: true,
                }
            });
        });
    }
    static decrementWalletCoins(userId, coins) {
        return __awaiter(this, void 0, void 0, function* () {
            return Wallet_1.WalletModel.update({
                where: { userId },
                data: { coins: { decrement: coins } },
                include: {
                    user: true,
                }
            });
        });
    }
    static incrementWalletCoins(userId, coins) {
        return __awaiter(this, void 0, void 0, function* () {
            return Wallet_1.WalletModel.update({
                where: { userId },
                data: { coins: { increment: coins } },
                include: {
                    user: true,
                }
            });
        });
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
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return Wallet_1.WalletModel.delete({ where: { id } });
        });
    }
}
exports.WalletRepo = WalletRepo;
//# sourceMappingURL=wallet.repository.js.map