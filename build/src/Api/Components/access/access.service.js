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
const ApiError_1 = require("../../../core/ApiError");
const user_repository_1 = __importDefault(require("./user.repository"));
const tokenKeyGenerator_1 = require("../../../helpers/tokenKeyGenerator");
const authUtils_1 = require("../../../utils/authUtils");
const Address_1 = require("./Address");
const Guardian_1 = require("./Guardian");
const MedicalCondition_1 = require("./MedicalCondition");
const EmergencyContact_1 = require("./EmergencyContact");
const Student_1 = require("./Student");
class AccessService {
    createParent(userData, emergencyContact) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessTokenKey = (0, tokenKeyGenerator_1.generateTokenKey)();
            const refreshTokenKey = (0, tokenKeyGenerator_1.generateTokenKey)();
            const { address } = userData, parentData = __rest(userData, ["address"]);
            const { user, keystore } = yield user_repository_1.default.create(parentData, accessTokenKey, refreshTokenKey, "PARENT");
            if (!user)
                throw new ApiError_1.BadRequestError('Parent creation field!');
            const tokens = yield (0, authUtils_1.createTokens)(user, keystore.primaryKey, keystore.secondaryKey);
            //creating parent address
            const parentAddress = yield Address_1.AddressModel.create({
                data: Object.assign(Object.assign({}, address), { userId: user.id })
            });
            if (!parentAddress) {
                throw new ApiError_1.BadRequestError('Address creation field!');
            }
            const emContact = yield EmergencyContact_1.EmergencyContactModel.create({
                data: Object.assign(Object.assign({}, emergencyContact), { userId: user.id })
            });
            if (!emContact)
                throw new ApiError_1.BadRequestError('Emergency Contact creation field!');
            return { user, tokens };
        });
    }
    createStudent(userData, medicalCondition, parentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = Object.assign(Object.assign({}, userData), { parentId });
            if (userData.dateOfBirth) {
                data.dateOfBirth = new Date(userData.dateOfBirth);
            }
            const student = yield Student_1.StudentModel.create({ data: userData });
            if (medicalCondition) {
                const medical = yield MedicalCondition_1.MedicalConditionModel.create({
                    data: Object.assign(Object.assign({}, medicalCondition), { studentId: student.id })
                });
                if (!medical)
                    throw new ApiError_1.BadRequestError('Medical condition creation field!');
            }
            return { student };
        });
    }
    createGuardians(guardians) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdGuardians = yield Guardian_1.GuardianModel.createMany({ data: guardians });
            if (!createdGuardians)
                throw new ApiError_1.BadRequestError('Guardians creation field!');
            return { guardians: createdGuardians };
        });
    }
}
exports.AccessService = AccessService;
//# sourceMappingURL=access.service.js.map