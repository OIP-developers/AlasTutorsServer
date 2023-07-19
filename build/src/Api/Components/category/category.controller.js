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
exports.CategoryController = void 0;
const async_1 = __importDefault(require("../../../helpers/async"));
const category_repository_1 = __importDefault(require("./category.repository"));
const ApiError_1 = require("../../../core/ApiError");
const ApiResponse_1 = require("../../../core/ApiResponse");
const Category_1 = require("./Category");
const repository_1 = require("../common/repository");
class CategoryController {
    constructor() {
        // getAll = asyncHandler(
        //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
        //     const categories = await CategoryRepo.find({ where: {} });
        //     if (categories.length === 0) throw new NoDataError();
        //     new SuccessResponse('fetch success', { categories }).send(res);
        //   }
        // )
        this.getAll = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { query } = req;
            const { entities, pagination } = yield repository_1.Repository.findMany({
                Model: Category_1.CategoryModel,
                where: {},
                search: query.search,
                limit: query.limit,
                page: query.page,
                fullTextSearch: ['name', 'title']
            });
            new ApiResponse_1.SuccessResponse('fetch success', { entities, pagination }).send(res);
        }));
        this.getById = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const entity = yield category_repository_1.default.findById({ where: { id: req.params.id } });
            if (!entity)
                throw new ApiError_1.NoDataError();
            new ApiResponse_1.SuccessResponse('fetch success', { entity }).send(res);
        }));
        this.create = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            body.name = body.name.toLowerCase();
            if (!body.slug) {
                body.slug = body.name.slice(0, 2) + "-" + Math.floor((Math.random() * 10000) + 1);
            }
            // const isExist = await CategoryRepo.findOne({ name: body.name } as Category)
            // if (isExist) throw new BadRequestError("this category type already exist!")
            const category = yield category_repository_1.default.create({ category: body });
            new ApiResponse_1.SuccessResponse('create success', { category }).send(res);
        }));
        this.statusUpdate = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { body, params } = req;
            // const isExist = await CategoryRepo.findOne({ name: body.name } as Category)
            // if (isExist) throw new BadRequestError("this category type already exist!")
            const category = yield category_repository_1.default.statusUpdate({ id: params.id, status: body });
            new ApiResponse_1.SuccessResponse('status updated success', { category }).send(res);
        }));
        this.update = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { body, params } = req;
            body.name = body.name.toLowerCase();
            const category = yield category_repository_1.default.update({ id: params.id, category: body });
            new ApiResponse_1.SuccessResponse('update success', { category }).send(res);
        }));
        this.delete = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { params } = req;
            const category = yield category_repository_1.default.delete(params.id);
            new ApiResponse_1.SuccessResponse('delete success', { category }).send(res);
        }));
    }
}
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map