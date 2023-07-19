"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = {
    create: joi_1.default.object().keys({
        company_name: joi_1.default.string().required().min(3).max(20),
        fullname: joi_1.default.string().required().min(3).max(20),
        email: joi_1.default.string().required().email(),
        phone: joi_1.default.number().required(),
        address: joi_1.default.string().required(),
        city: joi_1.default.string().required(),
        state: joi_1.default.string().required(),
        zip_code: joi_1.default.string().required(),
        country: joi_1.default.string().required(),
        sub_total: joi_1.default.number().required(),
        total: joi_1.default.number().required(),
        quantity: joi_1.default.number().required(),
        price: joi_1.default.number().required(),
        productId: joi_1.default.string().required()
    }),
    status: joi_1.default.object().keys({
        status: joi_1.default.string().valid('PUBLIC', 'PRIVATE', 'DRAFT').required(),
    }),
};
//# sourceMappingURL=schema.js.map