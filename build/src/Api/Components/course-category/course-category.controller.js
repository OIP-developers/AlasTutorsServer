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
exports.CourseCategoryController = void 0;
const async_1 = __importDefault(require("../../../helpers/async"));
const ApiResponse_1 = require("../../../core/ApiResponse");
// import CourseCategoryRepo from "./Course-Category";
const course_category_repository_1 = __importDefault(require("./course-category.repository"));
class CourseCategoryController {
    constructor() {
        this.getAll = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const courseCategory = yield course_category_repository_1.default.find();
            new ApiResponse_1.SuccessResponse('fetch success', { courseCategory }).send(res);
        }));
        this.delete = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { params } = req;
            const courseCategory = yield course_category_repository_1.default.delete(params.id);
            new ApiResponse_1.SuccessResponse('delete success', { courseCategory }).send(res);
        }));
        this.getById = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { user, parms } = req;
            const courseCategory = yield course_category_repository_1.default.findById(req.params.id);
            new ApiResponse_1.SuccessResponse('fetch success', { courseCategory }).send(res);
        }));
        // getAll = asyncHandler(
        //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
        //     const { query } = req
        //     const { entities, pagination } = await Repository.findMany<
        //       Prisma.CategoryWhereInput,
        //       Prisma.CategoryDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>,
        //       Prisma.CategorySelect,
        //       Prisma.CategoryInclude
        //     >({
        //       Model: CategoryModel,
        //       where: {},
        //       search: query.search,
        //       limit: query.limit,
        //       page: query.page,
        //       fullTextSearch: ['name', 'title']
        //     });
        //     new SuccessResponse('fetch success', { entities, pagination }).send(res);
        //   }
        // )
        // getById = asyncHandler(
        //   async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        //     const entity = await CategoryRepo.findById({ where: { id: req.params.id } });
        //     if (!entity) throw new NoDataError();
        //     new SuccessResponse('fetch success', { entity }).send(res);
        //   }
        // )
        this.create = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            console.log("body", body);
            const category = yield course_category_repository_1.default.create(body);
            new ApiResponse_1.SuccessResponse('create success', { category }).send(res);
        }));
        this.update = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { body, params } = req;
            const courseCategory = yield course_category_repository_1.default.update(params.id, body);
            new ApiResponse_1.SuccessResponse('update success', { courseCategory }).send(res);
        }));
        // statusUpdate = asyncHandler(
        //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
        //     const { body, params } = req;
        //     const category = await CategoryRepo.statusUpdate({ id: params.id, status: body });
        //     new SuccessResponse('status updated success', { category }).send(res);
        //   }
        // )
        // update = asyncHandler(
        //   async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        //     const { body, params } = req;
        //     body.name = body.name.toLowerCase();
        //     const category = await CategoryRepo.update({ id: params.id, category: body });
        //     new SuccessResponse('update success', { category }).send(res);
        //   }
        // )
        // delete = asyncHandler(
        //   async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        //     const { params } = req;
        //     const category = await CategoryRepo.delete(params.id);
        //     new SuccessResponse('delete success', { category }).send(res);
        //   }
        // )
    }
}
exports.CourseCategoryController = CourseCategoryController;
//# sourceMappingURL=course-category.controller.js.map