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
const Cart_1 = require("./Cart");
const User_1 = require("./../access/User");
class CartRepo {
    // public static findById(id: Cart['id']) {
    static findById({ where }) {
        return User_1.UserModel.findUnique({
            where,
            include: {
                Cart: true
            }
        });
    }
    static findOne({ where }) {
        return Cart_1.CartModel.findFirst({ where: Object.assign({}, where) });
    }
    static findMany({ Model, where, search, page = '1', limit = '10', fullTextSearch }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (search) {
                where = Object.assign(Object.assign({}, where), { OR: fullTextSearch.map((key) => {
                        return { name: { search } };
                    }) });
            }
            console.log(JSON.stringify(where, null, 2));
            // pagination
            const crPage = parseInt(page, 10) || 1;
            const crLimit = parseInt(limit, 10) || 10;
            const startIndex = (crPage - 1) * crLimit;
            const endIndex = crPage * crLimit;
            // @ts-ignore
            const total = yield Model.count({ where });
            const pages = Math.ceil(total / crLimit);
            const pagination = {};
            pagination.total = total;
            pagination.pages = pages;
            if (endIndex < total) {
                pagination.next = {
                    page: crPage + 1,
                    limit: crLimit,
                };
            }
            if (startIndex > 0) {
                pagination.prev = {
                    page: crPage - 1,
                    limit: crLimit,
                };
            }
            // @ts-ignore
            const entities = yield Model.findMany({
                where,
                skip: crLimit * (crPage - 1),
                take: crLimit
            });
            return { entities, pagination };
        });
    }
    static find({ where }) {
        return Cart_1.CartModel.findMany({ where: { isDeleted: false }, orderBy: { createdAt: 'desc' } });
    }
    static create({ body, user }) {
        return __awaiter(this, void 0, void 0, function* () {
            return Cart_1.CartModel.create({
                data: {
                    userId: user.id,
                    ProductId: body.ProductId,
                    quantity: body.quantity
                }
            });
        });
    }
    static update({ id, body }) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log("--------=====",id,cart);
            return Cart_1.CartModel.update({
                where: { id },
                data: {
                    ProductId: body.ProductId,
                    quantity: body.quantity
                }
            });
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return Cart_1.CartModel.delete({
                where: { id }
            });
        });
    }
}
exports.default = CartRepo;
//# sourceMappingURL=cart.repository.js.map