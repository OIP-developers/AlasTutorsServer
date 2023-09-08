"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const database_1 = require("./../../../database");
exports.DOCUMENT_NAME = database_1.IPrisma.ModelName.Student;
exports.COLLECTION_NAME = 'student';
exports.StudentModel = database_1.prisma.student;
//# sourceMappingURL=Student.js.map