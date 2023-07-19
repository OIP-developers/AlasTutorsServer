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
exports.SubCourseCategoryController = void 0;
const async_1 = __importDefault(require("../../../../helpers/async"));
const ApiResponse_1 = require("../../../../core/ApiResponse");
const sub_course_category_repository_1 = __importDefault(require("./sub-course-category.repository"));
// import CourseCategoryRepo from "./Course-Category";
// import CourseCategoryRepo from "./course-category.repository";
class SubCourseCategoryController {
    constructor() {
        this.getAll = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const courseCategory = yield sub_course_category_repository_1.default.find();
            console.log("sub", courseCategory);
            new ApiResponse_1.SuccessResponse('fetch success', { courseCategory }).send(res);
        }));
        //  getAll = asyncHandler(
        //     async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
        //       const { query } = req
        //       const { entities, pagination } = await Repository.findMany<
        //         Prisma.CourseSubCategoryWhereInput,
        //         Prisma.CourseSubCategoryDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>,
        //         Prisma.CourseSubCategorySelect,
        //         Prisma.CourseSubCategoryInclude
        //       >({
        //         Model: CourseSubCategoryModel,
        //         where: {},
        //         search: query.search,
        //         limit: query.limit,
        //         page: query.page,
        //         fullTextSearch: ['fullname', 'title']
        //       });
        //       new SuccessResponse('fetch success', { entities, pagination }).send(res);
        //     }
        //   )
        this.delete = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { params } = req;
            const courseCategory = yield sub_course_category_repository_1.default.delete(params.id);
            new ApiResponse_1.SuccessResponse('delete success', { courseCategory }).send(res);
        }));
        // getById = asyncHandler(
        //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
        //     const { user, parms } = req;
        //     const courseCategory = await CourseCategoryRepo.findById(req.params.id);
        //     new SuccessResponse('fetch success', { courseCategory }).send(res);
        //   }
        // )
        this.create = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            console.log("body", body);
            const category = yield sub_course_category_repository_1.default.create({ SubCourseCategory: body });
            new ApiResponse_1.SuccessResponse('create success', { category }).send(res);
        }));
        this.update = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { body, params } = req;
            const courseCategory = yield sub_course_category_repository_1.default.update({ id: params.id, category: body });
            new ApiResponse_1.SuccessResponse('update success', { courseCategory }).send(res);
        }));
    }
}
exports.SubCourseCategoryController = SubCourseCategoryController;
//# sourceMappingURL=sub-course-category.controller.js.map