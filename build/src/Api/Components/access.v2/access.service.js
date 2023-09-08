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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessService = void 0;
const user_repository_1 = __importDefault(require("./user.repository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const slugify_1 = __importDefault(require("slugify"));
const role_repository_1 = __importDefault(require("../roles/role.repository"));
const ApiError_1 = require("../../../core/ApiError");
const password_1 = require("../../../utils/password");
const tokenKeyGenerator_1 = require("../../../helpers/tokenKeyGenerator");
const authUtils_1 = require("../../../utils/authUtils");
const keystore_repository_1 = __importDefault(require("./keystore.repository"));
class AccessService {
    createParentUser(userData, emergencyContact, students, guardians) {
        return __awaiter(this, void 0, void 0, function* () {
            const { address } = userData, parentData = __rest(userData, ["address"]);
            const role = yield role_repository_1.default.findByCode("PARENT");
            const password = bcrypt_1.default.hashSync(parentData.password, 10);
            let username = (`${parentData.first_name}.${parentData.last_name}`).toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
            //to generate a unique username
            const userCount = yield user_repository_1.default.count();
            username = username.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
            username = `${username}.${userCount}`;
            parentData.username = (0, slugify_1.default)(username);
            const allStudents = students.map((stu) => {
                const { medicalCondition } = stu, studentData = __rest(stu, ["medicalCondition"]);
                studentData.dateOfBirth = new Date(studentData.dateOfBirth);
                return Object.assign(Object.assign({}, studentData), { medicalCondition: {
                        create: Object.assign({}, medicalCondition)
                    } });
            });
            const user = yield user_repository_1.default.create(Object.assign(Object.assign({}, parentData), { password, roleId: role.id, address: {
                    create: address
                }, emergencyContact: {
                    create: emergencyContact
                }, students: {
                    create: allStudents
                }, guardians: {
                    create: guardians
                } }));
            return user;
        });
    }
    userLogin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_repository_1.default.findByEmail(email, true);
            if (!user)
                throw new ApiError_1.BadRequestError('Invalid credentials');
            if (!user.password)
                throw new ApiError_1.BadRequestError('Credential not set');
            if (!user.status)
                throw new ApiError_1.BadRequestError('User InActive');
            const isValidPassword = yield (0, password_1.comparePassword)(password, user.password);
            if (!isValidPassword) {
                throw new ApiError_1.BadRequestError('Invalid credentials!');
            }
            const accessTokenKey = (0, tokenKeyGenerator_1.generateTokenKey)();
            const refreshTokenKey = (0, tokenKeyGenerator_1.generateTokenKey)();
            yield keystore_repository_1.default.create(user.id, accessTokenKey, refreshTokenKey);
            const tokens = yield (0, authUtils_1.createTokens)(user, accessTokenKey, refreshTokenKey);
            const userClone = structuredClone(user);
            //@ts-ignore
            delete userClone.password;
            return { tokens, user: userClone };
        });
    }
}
exports.AccessService = AccessService;
//# sourceMappingURL=access.service.js.map