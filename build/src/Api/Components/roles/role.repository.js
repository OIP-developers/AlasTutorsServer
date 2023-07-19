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
const database_1 = require("./../../../database");
class RoleRepo {
    static findById(id) {
        return database_1.prisma.role.findUnique({ where: { id } });
    }
    static findByCode(code) {
        return database_1.prisma.role.findUnique({ where: { code } });
    }
    static createMany(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const roles = yield database_1.prisma.role.createMany({
                data: body,
                skipDuplicates: true,
            });
            return { roles };
        });
    }
}
exports.default = RoleRepo;
//# sourceMappingURL=role.repository.js.map