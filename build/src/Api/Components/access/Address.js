"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const database_1 = require("./../../../database");
exports.DOCUMENT_NAME = database_1.IPrisma.ModelName.Address;
exports.COLLECTION_NAME = 'address';
exports.AddressModel = database_1.prisma.address;
//# sourceMappingURL=Address.js.map