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
exports.CartController = void 0;
const async_1 = __importDefault(require("../../../helpers/async"));
const cart_repository_1 = __importDefault(require("./cart.repository"));
const ApiError_1 = require("../../../core/ApiError");
const ApiResponse_1 = require("../../../core/ApiResponse");
class CartController {
    constructor() {
        // getAll = asyncHandler(
        //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
        //     const categories = await CartRepo.find({ where: {} });
        //     if (categories.length === 0) throw new NoDataError();
        //     new SuccessResponse('fetch success', { categories }).send(res);
        //   }
        // )
        // getAll = asyncHandler(
        //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
        //     const { query } = req
        //     const { entities, pagination } = await Repository.findMany<
        //       Prisma.CartWhereInput,
        //       Prisma.CartDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>,
        //       Prisma.CartSelect,
        //       Prisma.CartInclude
        //     >({
        //       Model: CartModel,
        //       where: {},
        //       search: query.search,
        //       limit: query.limit,
        //       page: query.page,
        //       fullTextSearch: ['fullname', 'title']
        //     });
        //     new SuccessResponse('fetch success', { entities, pagination }).send(res);
        //   }
        // )
        this.getById = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const entity = yield cart_repository_1.default.findById({ where: { id: req.params.id } });
            if (!entity)
                throw new ApiError_1.NoDataError();
            new ApiResponse_1.SuccessResponse('fetch success', { entity }).send(res);
        }));
        this.create = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { body, user } = req;
            const entity = yield cart_repository_1.default.create({ body: body, user: user });
            new ApiResponse_1.SuccessResponse('create success', { entity }).send(res);
        }));
        // statusUpdate = asyncHandler(
        //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
        //     const { body, params } = req;
        //     // const isExist = await CartRepo.findOne({ name: body.name } as Cart)
        //     // if (isExist) throw new BadRequestError("this cart type already exist!")
        //     const cart = await CartRepo.statusUpdate({ id: params.id, status: body });
        //     new SuccessResponse('status updated success', { cart }).send(res);
        //   }
        // )
        this.update = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { body, params } = req;
            const entity = yield cart_repository_1.default.update({ id: params.id, body: body });
            new ApiResponse_1.SuccessResponse('update success', { entity }).send(res);
        }));
        this.delete = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { params } = req;
            const entity = yield cart_repository_1.default.delete(params.id);
            new ApiResponse_1.SuccessResponse('delete success', { entity }).send(res);
        }));
    }
}
exports.CartController = CartController;
//# sourceMappingURL=cart.controller.js.map