"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const database_1 = require("./../../../database");
exports.DOCUMENT_NAME = 'Token';
exports.COLLECTION_NAME = 'tokens';
exports.TokenModel = database_1.prisma.tokenstore;
//# sourceMappingURL=Token.js.map