"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = {
    create: joi_1.default.object().keys({
        name: joi_1.default.string().required().min(3).max(20),
        order: joi_1.default.number().required(),
        slug: joi_1.default.string().optional(),
        title: joi_1.default.string().optional(),
        description: joi_1.default.string().optional(),
        image: joi_1.default.string().optional().uri(),
    }),
    status: joi_1.default.object().keys({
        status: joi_1.default.string().valid('PUBLIC', 'PRIVATE', 'DRAFT').required(),
    }),
};
//# sourceMappingURL=schema.js.map