"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalConditionModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const database_1 = require("./../../../database");
exports.DOCUMENT_NAME = database_1.IPrisma.ModelName.MedicalCondition;
exports.COLLECTION_NAME = 'medicalCondition';
exports.MedicalConditionModel = database_1.prisma.medicalCondition;
//# sourceMappingURL=MedicalCondition.js.map