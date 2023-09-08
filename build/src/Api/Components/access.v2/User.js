"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const database_1 = require("../../../database");
exports.DOCUMENT_NAME = database_1.IPrisma.ModelName.User;
exports.COLLECTION_NAME = 'users';
exports.UserModel = database_1.prisma.user;
//# sourceMappingURL=User.js.map