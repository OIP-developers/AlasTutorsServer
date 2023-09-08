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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const student_repository_1 = __importDefault(require("./student.repository"));
const ApiError_1 = require("../../../core/ApiError");
class StudentService {
    constructor() {
        this.studentRepo = new student_repository_1.default();
    }
    findStudents(role, studentId, userId, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = {};
            if (role === "PARENT") {
                where.parentId = userId;
            }
            if (studentId) {
                where.id = studentId;
            }
            const data = yield this.studentRepo.findStudents(Object.assign({ where }, query));
            return data;
        });
    }
    ;
    createStudent(role, userId, studentData, medicalCondition) {
        return __awaiter(this, void 0, void 0, function* () {
            if (role === "PARENT") {
                const student = yield this.studentRepo.create({
                    data: Object.assign(Object.assign({}, studentData), { parentId: userId, medicalCondition: {
                            create: Object.assign({}, medicalCondition)
                        } }),
                    include: {
                        medicalCondition: true
                    }
                });
                return { student };
            }
            else {
                throw new ApiError_1.BadRequestError("Invalid role");
            }
        });
    }
    ;
    updateStudent(studentId, role, userId, studentData, medicalCondition) {
        return __awaiter(this, void 0, void 0, function* () {
            if (role === "PARENT") {
                yield this.studentRepo.findOneOrThrow({
                    where: { id: studentId, parentId: userId }, include: {
                        medicalCondition: true
                    }
                });
            }
            else {
                throw new ApiError_1.BadRequestError("Invalid role");
            }
            const student = yield this.studentRepo.update({
                where: { id: studentId },
                data: Object.assign(Object.assign({}, studentData), { medicalCondition: {
                        update: Object.assign({}, medicalCondition),
                    } }),
                include: {
                    parent: false,
                    medicalCondition: true
                },
            });
            return student;
        });
    }
    ;
    deleteStudent(studentId, role, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (role === "PARENT") {
                yield this.studentRepo.findOneOrThrow({
                    where: { id: studentId, parentId: userId }, include: {
                        parent: false,
                        medicalCondition: true
                    }
                });
            }
            else {
                throw new ApiError_1.BadRequestError("Invalid role");
            }
            const student = yield this.studentRepo.delete({ where: { id: studentId }, include: { parent: false } });
            return student;
        });
    }
    ;
}
exports.StudentService = StudentService;
//# sourceMappingURL=student.service.js.map