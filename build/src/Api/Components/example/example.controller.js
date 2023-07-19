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
exports.ExampleController = void 0;
const async_1 = __importDefault(require("../../../helpers/async"));
const example_repository_1 = __importDefault(require("./example.repository"));
const ApiError_1 = require("../../../core/ApiError");
const ApiResponse_1 = require("../../../core/ApiResponse");
class ExampleController {
    constructor() {
        this.getAll = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const examples = yield example_repository_1.default.find();
            new ApiResponse_1.SuccessResponse('fetch success', { examples }).send(res);
        }));
        this.getById = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const example = yield example_repository_1.default.findById(req.params.id);
            new ApiResponse_1.SuccessResponse('fetch success', { example }).send(res);
        }));
        this.create = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            const isExist = yield example_repository_1.default.findOne({ name: body.name });
            if (isExist)
                throw new ApiError_1.BadRequestError("this example type already exist!");
            const example = yield example_repository_1.default.create(body);
            new ApiResponse_1.SuccessResponse('create success', { example }).send(res);
        }));
        this.update = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { body, params } = req;
            const example = yield example_repository_1.default.update(params.id, body);
            new ApiResponse_1.SuccessResponse('update success', { example }).send(res);
        }));
        this.delete = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { params } = req;
            const example = yield example_repository_1.default.delete(params.id);
            new ApiResponse_1.SuccessResponse('delete success', { example }).send(res);
        }));
    }
}
exports.ExampleController = ExampleController;
//# sourceMappingURL=example.controller.js.map