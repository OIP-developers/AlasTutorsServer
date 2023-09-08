"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModel = exports.RoleCode = exports.RoleEnum = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const database_1 = require("./../../../database");
Object.defineProperty(exports, "RoleCode", { enumerable: true, get: function () { return database_1.RoleCode; } });
exports.DOCUMENT_NAME = 'Role';
exports.COLLECTION_NAME = 'roles';
exports.RoleEnum = database_1.RoleCode;
exports.RoleModel = database_1.prisma.role;
//# sourceMappingURL=Role.js.map