"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const express_1 = require("express");
const student_controller_1 = require("./student.controller");
const authentication_1 = __importDefault(require("../../../middleware/authentication"));
const validator_1 = __importDefault(require("../../../helpers/validator"));
const joi_schema_1 = require("../../../utils/joi.schema");
class StudentRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new student_controller_1.StudentController();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/:id?', authentication_1.default, this.controller.getStudents);
        this.router.post('/', (0, validator_1.default)(joi_schema_1.updateStudentSchema), authentication_1.default, this.controller.createStudent);
        this.router.put('/:id', (0, validator_1.default)(joi_schema_1.updateStudentSchema), authentication_1.default, this.controller.updateStudent);
        this.router.delete('/:id', authentication_1.default, this.controller.deleteStudent);
    }
}
exports.StudentRoutes = StudentRoutes;
//# sourceMappingURL=student.routes.js.map