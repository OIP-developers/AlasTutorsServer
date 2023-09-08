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
exports.RoleRepository = void 0;
const Role_1 = require("./Role");
class RoleRepository {
    static findByCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield Role_1.RoleModel.findUniqueOrThrow({ where: { code } });
            return role;
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield Role_1.RoleModel.findUniqueOrThrow({ where: { id } });
            return role;
        });
    }
}
exports.RoleRepository = RoleRepository;
;
exports.default = RoleRepository;
//# sourceMappingURL=role.repository.js.map