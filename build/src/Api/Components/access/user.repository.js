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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./User");
const role_repository_1 = __importDefault(require("../roles/role.repository"));
const ApiError_1 = require("../../../core/ApiError");
const bcrypt_1 = __importDefault(require("bcrypt"));
const keystore_repository_1 = __importDefault(require("./keystore.repository"));
const Logger_1 = __importDefault(require("../../../core/Logger"));
class UserRepo {
    static find({ where }) {
        return User_1.UserModel.findMany({
            where: Object.assign({}, where)
        });
    }
    static findUsers() {
        return User_1.UserModel.findMany({
            where: {
                role: { code: "STUDENT" }
            },
            include: {
                role: {
                    select: {
                        id: true,
                        code: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }
    static findOne({ where }) {
        return User_1.UserModel.findFirst({
            where,
            include: {
                role: {
                    select: {
                        id: true,
                        code: true
                    }
                }
            }
        });
    }
    // public static findTeachers(): Promise<User[] | null> {
    //   return UserModel.findMany({
    //     where: {
    //       role: { code: "DRIVER" }
    //     },
    //     include: {
    //       role: {
    //         select: {
    //           id: true,
    //           code: true
    //         }
    //       }
    //     },
    //     orderBy: { createdAt: 'desc' }
    //   })
    // }
    // public static findEmployeeByCompany(country: string): Promise<User[] | null> {
    //   return UserModel.findMany({
    //     where: {
    //       role: {
    //         code: { in: ["ADMIN", "DRIVER", "USER"] }
    //       },
    //       country
    //     },
    //     include: {
    //       role: {
    //         select: {
    //           id: true,
    //           code: true
    //         }
    //       }
    //     },
    //     orderBy: { createdAt: 'desc' }
    //   })
    // }
    static findById(id) {
        return User_1.UserModel.findFirst({
            where: { id, status: 'PUBLIC' },
            include: {
                role: {
                    select: {
                        id: true,
                        code: true
                    }
                },
            }
        });
    }
    static findByEmail(email) {
        return User_1.UserModel.findFirst({
            where: { email },
            include: {
                role: {
                    select: {
                        id: true,
                        code: true
                    }
                },
            }
        });
    }
    static create(user, accessTokenKey, refreshTokenKey, roleCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            const role = yield role_repository_1.default.findByCode(roleCode);
            if (!role)
                throw new ApiError_1.InternalError('Role must be defined in db!');
            user.password = bcrypt_1.default.hashSync(user.password || "NotPossible", 10);
            user.roleId = role.id;
            user.phone_status = 'VERIFIED'; // 'VERIFIED'; // 'PENDING'
            user.gender = 'MALE';
            user.createdAt = user.updatedAt = now;
            // @ts-ignore 
            delete user.role;
            const createdUser = yield User_1.UserModel.create({
                data: Object.assign({}, user),
                include: {
                    role: {
                        select: {
                            id: true,
                            code: true
                        }
                    }
                }
            });
            const keystore = yield keystore_repository_1.default.create(createdUser.id, accessTokenKey, refreshTokenKey);
            return { user: createdUser, keystore };
        });
    }
    static createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            // @ts-ignore 
            const role = yield role_repository_1.default.findByCode(user.role);
            if (!role)
                throw new ApiError_1.InternalError('Role must be defined in db!');
            user.password = bcrypt_1.default.hashSync(user.password || "NotPossible", 10);
            user.roleId = role.id;
            user.createdAt = user.updatedAt = now;
            // @ts-ignore 
            delete user.role;
            const createdUser = yield User_1.UserModel.create({
                data: user,
                include: {
                    role: {
                        select: {
                            id: true,
                            code: true
                        }
                    },
                }
            });
            return { user: createdUser };
        });
    }
    static update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            if (user.role) {
                // @ts-ignore
                const role = yield role_repository_1.default.findByCode(user.role);
                if (!role)
                    throw new ApiError_1.InternalError('Role must be defined in db!');
                user.roleId = role.id;
            }
            if (user.password) {
                user.password = bcrypt_1.default.hashSync(user.password || "NotPossible", 10);
                Logger_1.default.info(`user (${user.email}) password update`);
            }
            else {
                // @ts-ignore 
                delete user.password;
            }
            // @ts-ignore 
            delete user.role;
            // @ts-ignore 
            delete user.company;
            return User_1.UserModel.update({
                where: { id },
                data: user,
                include: {
                    role: {
                        select: {
                            id: true,
                            code: true
                        }
                    },
                }
            });
        });
    }
    static updatePassword(id, { password }) {
        return __awaiter(this, void 0, void 0, function* () {
            password = bcrypt_1.default.hashSync(password || "NotPossible", 10);
            Logger_1.default.info(`user (${id}) password update`);
            return User_1.UserModel.update({
                where: { id },
                data: {
                    password
                },
            });
        });
    }
    // public static async updateCompany(id: User['id'], country: User['country']): Promise<User | null> {
    //   return UserModel.update({
    //     where: { id },
    //     data: { country },
    //     include: {
    //       role: {
    //         select: {
    //           id: true,
    //           code: true
    //         }
    //       },
    //     }
    //   })
    // }
    static updateInfo(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            // delete user.password
            // delete user.roleId
            // delete user.companyId
            return User_1.UserModel.update({
                where: { id },
                data: user,
                include: {
                    role: {
                        select: {
                            id: true,
                            code: true
                        }
                    },
                }
            });
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return User_1.UserModel.delete({ where: { id } });
        });
    }
}
exports.default = UserRepo;
//# sourceMappingURL=user.repository.js.map