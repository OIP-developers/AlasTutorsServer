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
exports.OrderController = void 0;
const async_1 = __importDefault(require("../../../helpers/async"));
const order_repository_1 = __importDefault(require("./order.repository"));
const ApiError_1 = require("../../../core/ApiError");
const ApiResponse_1 = require("../../../core/ApiResponse");
const Order_1 = require("./Order");
const repository_1 = require("../common/repository");
class OrderController {
    constructor() {
        // getAll = asyncHandler(
        //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
        //     const categories = await OrderRepo.find({ where: {} });
        //     if (categories.length === 0) throw new NoDataError();
        //     new SuccessResponse('fetch success', { categories }).send(res);
        //   }
        // )
        this.getAll = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { query } = req;
            const { entities, pagination } = yield repository_1.Repository.findMany({
                Model: Order_1.OrderModel,
                where: {},
                include: {
                    invoice: true,
                    items: true,
                    user: true
                },
                search: query.search,
                limit: query.limit,
                page: query.page,
                fullTextSearch: ['fullname', 'title']
            });
            new ApiResponse_1.SuccessResponse('fetch success', { entities, pagination }).send(res);
        }));
        this.getById = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const entity = yield order_repository_1.default.findById({ where: { id: req.params.id } });
            if (!entity)
                throw new ApiError_1.NoDataError();
            new ApiResponse_1.SuccessResponse('fetch success', { entity }).send(res);
        }));
        this.create = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { body, user } = req;
            // const products: string[] = body.products;
            const order = yield order_repository_1.default.create({ body: body, user: user });
            new ApiResponse_1.SuccessResponse('create success', { order }).send(res);
        }));
        this.statusUpdate = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { body, params } = req;
            // const isExist = await OrderRepo.findOne({ name: body.name } as Order)
            // if (isExist) throw new BadRequestError("this order type already exist!")
            const order = yield order_repository_1.default.statusUpdate({ id: params.id, status: body });
            new ApiResponse_1.SuccessResponse('status updated success', { order }).send(res);
        }));
        this.update = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { body, params } = req;
            body.name = body.name.toLowerCase();
            const order = yield order_repository_1.default.update({ id: params.id, order: body });
            new ApiResponse_1.SuccessResponse('update success', { order }).send(res);
        }));
        this.delete = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { params } = req;
            const order = yield order_repository_1.default.delete(params.id);
            new ApiResponse_1.SuccessResponse('delete success', { order }).send(res);
        }));
    }
}
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map