"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeystoreModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const database_1 = require("../../../database");
exports.DOCUMENT_NAME = database_1.IPrisma.ModelName.Keystore;
exports.COLLECTION_NAME = 'keystores';
// schema.index({ client: 1, primaryKey: 1 });
// schema.index({ client: 1, primaryKey: 1, secondaryKey: 1 });
exports.KeystoreModel = database_1.prisma.keystore;
//# sourceMappingURL=Keystore.js.map