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
exports.Repository = void 0;
class Repository {
    static findMany({ Model, where, select, include, search, page = '1', limit = '10', fullTextSearch }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (search) {
                where = Object.assign(Object.assign({}, where), { OR: fullTextSearch.map((key) => {
                        return { [key]: { contains: search, mode: "insensitive" } };
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
                include,
                select,
                skip: crLimit * (crPage - 1),
                take: crLimit
            });
            return { entities, pagination };
        });
    }
}
exports.Repository = Repository;
//# sourceMappingURL=repository.js.map