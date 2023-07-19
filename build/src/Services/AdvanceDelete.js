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
const ErrorResponse_1 = __importDefault(require("../utils/ErrorResponse"));
const AdvancedDelete = (model) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    let errors = [];
    // console.log(query)
    // console.log(req.query)
    // console.log(model)
    // if (!query) return next(new ErrorResponse(400, 'Add delete query'))
    if (Object.keys(query).length === 0)
        return next(new ErrorResponse_1.default(400, 'Add delete query'));
    try {
        const deleted = yield model.findOneAndDelete(Object.assign({}, query));
        // console.log(deleted)
        if (!deleted) {
            return next(new ErrorResponse_1.default(404, "Delete Item Not Found"));
        }
        res.advanceDelete = {
            success: true,
            deleted,
        };
    }
    catch (error) {
        if (error.kind === "ObjectId") {
            errors.push(`Invalid ObjectId`);
            errors.push(`${error.reason}`);
            return next(new ErrorResponse_1.default(404, "Delete Item Not Found", errors));
        }
        else
            return next(new ErrorResponse_1.default(500, "Delete Field!"));
    }
    next();
});
exports.default = AdvancedDelete;
//# sourceMappingURL=AdvanceDelete.js.map