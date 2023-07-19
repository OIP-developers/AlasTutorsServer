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
const Invoice_1 = require("./Invoice");
const ApiError_1 = require("../../../core/ApiError");
class InvoiceRepo {
    static findById(id) {
        return Invoice_1.InvoiceModel
            .findUnique({
            where: { id },
            include: { order: true, user: true }
        });
    }
    static findAll(query) {
        return Invoice_1.InvoiceModel
            .findMany({
            where: Object.assign(Object.assign({}, query), { isDeleted: false }),
            include: { order: true, user: true },
            orderBy: { createdAt: 'desc' }
        });
    }
    static create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const invoice = yield Invoice_1.InvoiceModel.create({
                data: body,
                include: { order: true, user: true },
            });
            return { invoice };
        });
    }
    static updateByStripe(stripe, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const invoice = yield Invoice_1.InvoiceModel
                .update({
                where: { stripe },
                data: body,
                include: { order: true, user: true },
            });
            if (!invoice)
                throw new ApiError_1.BadRequestError('invoice not found!');
            return { invoice };
        });
    }
    static delete(stripe) {
        return __awaiter(this, void 0, void 0, function* () {
            const invoice = yield Invoice_1.InvoiceModel.delete({ where: { stripe } });
            if (!invoice)
                throw new ApiError_1.NoDataError();
            return { invoice };
        });
    }
}
exports.default = InvoiceRepo;
//# sourceMappingURL=invoice.repository.js.map