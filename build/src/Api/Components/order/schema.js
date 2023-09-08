"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = {
    create: joi_1.default.object().keys({
        productId: joi_1.default.array().required(),
    }),
    statusUpdate: joi_1.default.object().keys({
        status: joi_1.default.string().required()
    }),
    manufacturerUpdate: joi_1.default.object().keys({
        grossPrice: joi_1.default.number().required(),
        netPrice: joi_1.default.number().required(),
    }),
    employeeUpdate: joi_1.default.object().keys({
        margin: joi_1.default.number().required()
    }),
};
//# sourceMappingURL=schema.js.map