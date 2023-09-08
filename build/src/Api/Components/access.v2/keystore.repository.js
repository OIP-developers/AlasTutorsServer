"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Keystore_1 = require("./Keystore");
class KeystoreRepo {
    static findforKey(client, key) {
        return Keystore_1.KeystoreModel.findFirst({
            where: {
                clientId: client, primaryKey: key, status: 'PUBLIC'
            }
        });
    }
    static remove(id) {
        return Keystore_1.KeystoreModel.delete({ where: { id } });
    }
    static find(client, primaryKey, secondaryKey) {
        return Keystore_1.KeystoreModel.findFirst({
            where: {
                clientId: client,
                primaryKey: primaryKey,
                secondaryKey: secondaryKey,
            }
        });
    }
    static create(client, primaryKey, secondaryKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const keystore = yield Keystore_1.KeystoreModel.create({
                data: {
                    clientId: client,
                    primaryKey: primaryKey,
                    secondaryKey: secondaryKey
                }
            });
            return keystore;
        });
    }
}
exports.default = KeystoreRepo;
//# sourceMappingURL=keystore.repository.js.map