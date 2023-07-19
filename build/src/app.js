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
const dotenv_1 = require("dotenv");
const server_1 = require("./Api/server");
// import { RedisServer } from './database/redis'
const Logger_1 = __importDefault(require("./core/Logger"));
// import logger from "@Core/Logger";
const database_1 = require("./database");
// import './database/redis'
// import { redis_client } from './database/redis'
(0, dotenv_1.config)();
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield database_1.prisma.$connect();
            process.on('uncaughtException', (e) => {
                Logger_1.default.error(e);
            });
            // Init express server
            const server = new server_1.Server();
            server.listen();
        }
        catch (err) {
            console.log(err);
            Logger_1.default.error(err.stack);
        }
    });
})();
//# sourceMappingURL=app.js.map