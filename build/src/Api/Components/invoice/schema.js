"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
// import { COURSE_ENUM } from '../Course/Course'
exports.default = {
    btcPay: joi_1.default.object().keys({
        // course: Joi.string().required().valid(COURSE_ENUM.MASTER_CLASS, COURSE_ENUM.PREMIUM_VIP, COURSE_ENUM.PREMIUM_VIP_QUARTERLY, COURSE_ENUM.PREMIUM_VIP_YEARLY),
        // price: Joi.number().required(),
        currency: joi_1.default.string().required().valid("USD"),
        itemCode: joi_1.default.string().required(),
        itemDesc: joi_1.default.string().required(),
        data: {
            product: joi_1.default.string().required(),
            Action: joi_1.default.string().required(),
            Email: joi_1.default.string().required(),
            Telegram: joi_1.default.string().required(),
        },
    }),
    chargeCoinbase: joi_1.default.object().keys({
    // course: Joi.string().required().valid(COURSE_ENUM.MASTER_CLASS, COURSE_ENUM.PREMIUM_VIP, COURSE_ENUM.PREMIUM_VIP_QUARTERLY, COURSE_ENUM.PREMIUM_VIP_YEARLY)
    }),
    coinbase_header: joi_1.default.object().keys({
        'X-CC-Webhook-Signature': joi_1.default.string().required()
    }),
};
//# sourceMappingURL=schema.js.map