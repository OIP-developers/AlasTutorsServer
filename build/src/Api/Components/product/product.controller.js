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
exports.ProductController = void 0;
const async_1 = __importDefault(require("../../../helpers/async"));
const product_repository_1 = require("./product.repository");
const ApiResponse_1 = require("../../../core/ApiResponse");
const Product_1 = require("./Product");
const repository_1 = require("../common/repository");
class ProductController {
    constructor() {
        this.getAll = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { query } = req;
            const { entities, pagination } = yield repository_1.Repository.findMany({
                Model: Product_1.ProductModel,
                where: {},
                include: {
                    categories: {
                        select: {
                            category: true,
                        }
                    }
                },
                search: query.search,
                limit: query.limit,
                page: query.page,
                fullTextSearch: ['title', 'desc', 'price']
            });
            // if (categories.length === 0) throw new NoDataError();
            new ApiResponse_1.SuccessResponse('fetch success', { entities, pagination }).send(res);
        }));
        this.getById = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const entity = yield product_repository_1.ProductRepo.findById({ where: { id: req.params.id } });
            new ApiResponse_1.SuccessResponse('fetch success', { entity }).send(res);
        }));
        this.create = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            const categories = body.categories;
            // const gallery: string[] = body.gallery;
            // const tags: string[] = body.tags;
            const product = yield product_repository_1.ProductRepo.create({ body: body, categories: categories });
            new ApiResponse_1.SuccessResponse('create success', { product }).send(res);
        }));
        this.update = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { body, params } = req;
            const categories = body.categories;
            const product = yield product_repository_1.ProductRepo.update({ id: params.id, body: body, categories: categories });
            new ApiResponse_1.SuccessResponse('update success', { product }).send(res);
        }));
        this.delete = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { params } = req;
            const product = yield product_repository_1.ProductRepo.delete(params.id);
            new ApiResponse_1.SuccessResponse('delete success', { product }).send(res);
        }));
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map