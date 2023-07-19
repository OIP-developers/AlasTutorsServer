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
exports.ProductRepo = void 0;
const Product_1 = require("./Product");
class ProductRepo {
    static findById({ where }) {
        return Product_1.ProductModel.findUnique({ where });
    }
    static findOne({ where }) {
        return Product_1.ProductModel.findFirst({ where: Object.assign({}, where) });
    }
    static find({ where }) {
        return Product_1.ProductModel.findMany({
            where: { isDeleted: false }, include: {
                categories: true
            }, orderBy: { createdAt: 'desc' }
        });
    }
    static create({ body, categories }) {
        return __awaiter(this, void 0, void 0, function* () {
            return Product_1.ProductModel.create({
                data: {
                    title: body.title,
                    price: body.price,
                    desc: body.desc,
                    featured_image: body.featured_image,
                    categories: {
                        create: categories.map((categoryId) => {
                            return {
                                categoryId
                            };
                        })
                    }
                },
                include: {
                    categories: true
                }
            });
        });
    }
    static update({ id, body, categories }) {
        return __awaiter(this, void 0, void 0, function* () {
            return Product_1.ProductModel.update({
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
                            return { categoryId };
                        })
                    }
                },
                include: {
                    categories: true
                }
            });
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return Product_1.ProductModel.delete({
                where: { id }
            });
        });
    }
}
exports.ProductRepo = ProductRepo;
//# sourceMappingURL=product.repository.js.map