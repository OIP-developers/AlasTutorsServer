"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const database_1 = require("../../../database");
exports.DOCUMENT_NAME = database_1.IPrisma.ModelName.Wallet;
exports.COLLECTION_NAME = 'users';
exports.WalletModel = database_1.prisma.wallet;
//# sourceMappingURL=Wallet.js.map