"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuardianModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const database_1 = require("./../../../database");
exports.DOCUMENT_NAME = database_1.IPrisma.ModelName.Guardian;
exports.COLLECTION_NAME = 'guardian';
exports.GuardianModel = database_1.prisma.guardian;
//# sourceMappingURL=Guardian.js.map