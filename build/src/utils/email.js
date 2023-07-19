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
exports.sendMail = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const globals_1 = require("../config/globals");
const Logger_1 = __importDefault(require("../core/Logger"));
mail_1.default.setApiKey(globals_1.SMTP.SENDGRID_API_KEY);
const sendMail = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ppp = yield mail_1.default.send(Object.assign(Object.assign({}, msg), { from: globals_1.SMTP.sender }));
        Logger_1.default.info(`email send to ${msg.to}`);
        console.log('====================================');
        console.log(ppp);
        console.log('====================================');
    }
    catch (error) {
        console.log('====================================');
        console.log(JSON.stringify(error, null, 2));
        console.log('====================================');
        Logger_1.default.info(`email send field: ${msg.to}`);
    }
});
exports.sendMail = sendMail;
//# sourceMappingURL=email.js.map