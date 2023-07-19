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
const Token_1 = require("./Token");
class TokenRepo {
    static create(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return Token_1.TokenModel.create({
                data: token
            });
        });
    }
    static find({ userId, token, shot_code, type }) {
        return Token_1.TokenModel.findFirst({
            where: {
                userId,
                type,
                OR: [
                    { shot_code },
                    { token },
                ],
            }
        });
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
    static findOne({ where }) {
        return Token_1.TokenModel.findFirst({
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
        });
    }
}
exports.default = TokenRepo;
//# sourceMappingURL=token.repository.js.map