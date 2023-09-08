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
const repository_1 = require("../../../core/common/repository");
const Student_1 = require("./Student");
const repository_2 = require("../common/repository");
class StudentRepository extends repository_1.BaseRepository {
    constructor() {
        super({ model: Student_1.StudentModel });
    }
    findStudents(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { where, search, page = "1", limit = "10" } = params;
            const data = yield repository_2.Repository.findMany({
                Model: Student_1.StudentModel,
                fullTextSearch: ["first_name", "last_name"],
                search,
                page,
                limit,
                where,
                include: {
                    medicalCondition: true
                }
            });
            return data;
        });
    }
}
exports.default = StudentRepository;
//# sourceMappingURL=student.repository.js.map