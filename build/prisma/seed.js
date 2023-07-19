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
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const roles = yield prisma.role.createMany({
            data: [
                {
                    code: 'ADMIN',
                    status: 'PUBLIC',
                },
                {
                    code: 'TEACHER',
                    status: 'PUBLIC',
                },
                {
                    code: 'PARENT',
                    status: 'PUBLIC',
                },
                {
                    code: 'STUDENT',
                    status: 'PUBLIC',
                }
            ],
            skipDuplicates: true,
        });
        console.log({ roles });
        const admin_role = yield prisma.role.findUnique({ where: { code: "ADMIN" } });
        if (admin_role) {
            const admin = yield prisma.user.create({
                data: {
                    phone_status: "VERIFIED",
                    email: "superadmin@zipaway.com",
                    username: "superadmin",
                    password: bcrypt_1.default.hashSync("password", 10),
                    gender: "MALE",
                    profile_picture: "https://res.cloudinary.com/dh4lnup4h/image/upload/v1668985231/qac/ce5kbkufz4hkpsw6pw3s.png",
                    dateOfBirth: new Date('2023-01-23'),
                    first_name: "Super",
                    last_name: "Admin",
                    status: 'PUBLIC',
                    roleId: admin_role.id,
                }
            });
            console.log('=========Super Admin================');
            console.log(admin);
            console.log('====================================');
        }
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
//# sourceMappingURL=seed.js.map