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
const User_1 = require("./User");
const repository_1 = require("../common/repository");
class UserRepository {
    static count() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.UserModel.count();
        });
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.UserModel.create({ data });
        });
    }
    static findByEmail(email, include = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                where: {
                    email,
                }
            };
            if (include) {
                //@ts-ignore
                query.include = {
                    address: true,
                    emergencyContact: true,
                    students: true,
                    guardians: true,
                    role: true,
                };
            }
            return yield User_1.UserModel.findUnique(query);
        });
    }
    static findStudents(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { where, search, page = "1", limit = "10" } = params;
            const data = yield repository_1.Repository.findMany({
                Model: User_1.UserModel,
                fullTextSearch: ["first_name", "last_name"],
                search,
                page,
                limit,
                where,
            });
            return data;
        });
    }
}
exports.default = UserRepository;
//# sourceMappingURL=user.repository.js.map