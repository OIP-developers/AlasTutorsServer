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
exports.IPrisma = exports.prisma = exports.Currency = exports.RoleCode = exports.Gender = void 0;
// import { PrismaClient, Prisma } from '@prisma/client'
const client_1 = require("@prisma/client");
var client_2 = require("@prisma/client");
Object.defineProperty(exports, "Gender", { enumerable: true, get: function () { return client_2.Gender; } });
Object.defineProperty(exports, "RoleCode", { enumerable: true, get: function () { return client_2.RoleCode; } });
Object.defineProperty(exports, "Currency", { enumerable: true, get: function () { return client_2.Currency; } });
const Logger_1 = __importDefault(require("../core/Logger"));
const globals_1 = require("../config/globals");
exports.prisma = new client_1.PrismaClient();
exports.IPrisma = client_1.Prisma;
// Build the connection string
const enviroment = 'development';
// const dbURI = env.DB[enviroment].uri;
const dbURI = globals_1.DATABASE[globals_1.environment];
// {
//   errorFormat: 'pretty',
//   log: ['query', 'info', 'warn', 'error'],
//   debug: true,
//   logger: {
//     log: (e: any) => console.log(e),
//     error: (e: any) => console.error(e),
//     warn: (e: any) => console.warn(e),
//     info: (e: any) => console.info(e),
//   },
// }
// prisma.$on('query', (e: any) => {
//   console.log('Query: ' + e.query)
//   console.log('Params: ' + e.params)
//   console.log('Duration: ' + e.duration + 'ms')
// })
// prisma.$on('beforeExit', async () => {
//   console.log('beforeExit hook')
//   // await prisma.message.create({
//   //   data: {
//   //     message: 'Shutting down server',
//   //   },
//   // })
// })
(function db() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            Logger_1.default.info(`Connecting to ${process.env.DATABASE_URL}`);
            yield exports.prisma.$connect();
            Logger_1.default.info('postgresql connection done');
        }
        catch (error) {
            Logger_1.default.info('postgresql connection error');
            Logger_1.default.error(error);
            yield exports.prisma.$disconnect();
            process.exit(1);
        }
    });
})();
//# sourceMappingURL=index.js.map