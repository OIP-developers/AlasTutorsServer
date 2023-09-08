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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
const async_1 = __importDefault(require("../../../helpers/async"));
const ApiResponse_1 = require("../../../core/ApiResponse");
const student_service_1 = require("./student.service");
class StudentController {
    constructor() {
        this.service = new student_service_1.StudentService();
        this.getStudents = (0, async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const students = yield this.service.findStudents((_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === null || _b === void 0 ? void 0 : _b.code, (_c = req.params) === null || _c === void 0 ? void 0 : _c.id, (_d = req.user) === null || _d === void 0 ? void 0 : _d.id, req.query);
            new ApiResponse_1.SuccessResponse('Fetch successful', students).send(res);
        }));
        this.createStudent = (0, async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _e, _f, _g;
            const _h = req.body, { medicalCondition = {} } = _h, studentData = __rest(_h, ["medicalCondition"]);
            const student = yield this.service.createStudent((_f = (_e = req.user) === null || _e === void 0 ? void 0 : _e.role) === null || _f === void 0 ? void 0 : _f.code, (_g = req.user) === null || _g === void 0 ? void 0 : _g.id, studentData, medicalCondition);
            new ApiResponse_1.SuccessResponse('Fetch successful', student).send(res);
        }));
        this.updateStudent = (0, async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _j, _k, _l, _m;
            const studentId = (_j = req.params) === null || _j === void 0 ? void 0 : _j.id;
            if (!studentId)
                throw new Error("Invalid student id");
            const _o = req.body, { medicalCondition = undefined } = _o, studentData = __rest(_o, ["medicalCondition"]);
            const data = yield this.service.updateStudent(studentId, (_l = (_k = req.user) === null || _k === void 0 ? void 0 : _k.role) === null || _l === void 0 ? void 0 : _l.code, (_m = req.user) === null || _m === void 0 ? void 0 : _m.id, studentData, medicalCondition);
            new ApiResponse_1.SuccessResponse('Fetch successful', data).send(res);
        }));
        this.deleteStudent = (0, async_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _p, _q, _r, _s;
            const studentId = (_p = req.params) === null || _p === void 0 ? void 0 : _p.id;
            if (!studentId)
                throw new Error("Invalid student id");
            const students = yield this.service.deleteStudent(studentId, (_r = (_q = req.user) === null || _q === void 0 ? void 0 : _q.role) === null || _r === void 0 ? void 0 : _r.code, (_s = req.user) === null || _s === void 0 ? void 0 : _s.id);
            new ApiResponse_1.SuccessResponse('Fetch successful', students).send(res);
        }));
    }
}
exports.StudentController = StudentController;
//# sourceMappingURL=student.controller.js.map