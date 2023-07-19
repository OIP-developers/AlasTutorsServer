"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = {
    create: joi_1.default.object().keys({
        title: joi_1.default.string().required().min(3).max(20),
        desc: joi_1.default.string().required().min(3),
        price: joi_1.default.number().required(),
        featured_image: joi_1.default.string().required().uri(),
        categories: joi_1.default.array().required()
    }),
};
//# sourceMappingURL=schema.js.map