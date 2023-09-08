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
exports.CourseController = void 0;
const async_1 = __importDefault(require("../../../helpers/async"));
const ApiResponse_1 = require("../../../core/ApiResponse");
const course_repository_1 = __importDefault(require("./course.repository"));
const video_repository_1 = __importDefault(require("./video/video.repository"));
const courseReview_repository_1 = __importDefault(require("./review/courseReview.repository"));
const view_repository_1 = require("./view/view.repository");
class CourseController {
    constructor() {
        this.ViewRepository = new view_repository_1.ViewRepository();
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
        // create = asyncHandler(
        //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
        //     const { body } = req;
        //     console.log("course",body)
        //     // body.name = body.name.toLowerCase();
        //     // if (!body.slug) {
        //     //   body.slug = body.name.slice(0, 2) + "-" + Math.floor((Math.random() * 10000) + 1);
        //     // }
        //     const category = await CourseRepo.create({course:body});
        //     new SuccessResponse('create success', { category }).send(res);
        //   }
        // )
        this.getAll = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const courses = yield course_repository_1.default.find({
                where: {},
                include: {
                    orderItems: {
                        where: {
                            order: {
                                userId: user.id,
                                invoice: {
                                    status: 'paid'
                                }
                            }
                        }
                    },
                    Cart: {
                        where: {
                            userId: user.id
                        }
                    },
                    createdBy: {
                        select: {
                            id: true,
                            first_name: true,
                            last_name: true,
                            email: true,
                            profile_picture: true,
                        }
                    }
                }
            });
            new ApiResponse_1.SuccessResponse('fetch success', { courses }).send(res);
        }));
        this.getPublicCourses = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const courses = yield course_repository_1.default.find({
                where: {},
                include: {
                    tags: true,
                    banner: true,
                    category: true,
                    reviews: true,
                    thumbnail: true,
                    videos: true,
                    createdBy: {
                        select: {
                            id: true,
                            first_name: true,
                            last_name: true,
                            email: true,
                            profile_picture: true,
                        }
                    }
                }
            });
            new ApiResponse_1.SuccessResponse('fetch success', { courses }).send(res);
        }));
        this.create = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { body, user } = req;
            console.log("course", body);
            // body.name = body.name.toLowerCase();
            // if (!body.slug) {
            //   body.slug = body.name.slice(0, 2) + "-" + Math.floor((Math.random() * 10000) + 1);
            // }
            body.createdById = user.id;
            const course = yield course_repository_1.default.create(body);
            new ApiResponse_1.SuccessResponse('create success', { course }).send(res);
        }));
        // statusUpdate = asyncHandler(
        //   async (req: any, res: Response, next: NextFunction): Promise<Response | void> => {
        //     const { body, params } = req;
        //     const category = await CategoryRepo.statusUpdate({ id: params.id, status: body });
        //     new SuccessResponse('status updated success', { category }).send(res);
        //   }
        // )
        this.update = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { body, params } = req;
            console.log("body", body);
            // body.name = body.name.toLowerCase();
            const course = yield course_repository_1.default.update(params.id, body);
            console.log("body", body);
            new ApiResponse_1.SuccessResponse('update success', { course }).send(res);
        }));
        this.delete = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { params } = req;
            const category = yield course_repository_1.default.delete(params.id);
            new ApiResponse_1.SuccessResponse('delete success', { category }).send(res);
        }));
        this.getById = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { user, parms } = req;
            const course = yield course_repository_1.default.findById(req.params.id);
            //@ts-ignore
            const Cart = course.Cart.find((subs) => subs.userId === req.user.id);
            // console.log("isCart",isCart)
            //   console.log("isSubscribed",isSubscribed);
            // //   return {
            // //     isSubscribed: isSubscribed ? true : false,
            // //     ...channel
            // //   }
            // // })
            //@ts-ignore
            course.isCart = Cart ? true : false;
            new ApiResponse_1.SuccessResponse('fetch success', { course }).send(res);
        }));
        this.getByPublicId = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { user, parms } = req;
            const course = yield course_repository_1.default.findById(req.params.id);
            // //@ts-ignore
            // const Cart = course.Cart.find((subs) => subs.userId === req.user.id)
            // // console.log("isCart",isCart)
            // //   console.log("isSubscribed",isSubscribed);
            // // //   return {
            // // //     isSubscribed: isSubscribed ? true : false,
            // // //     ...channel
            // // //   }
            // // // })
            // //@ts-ignore
            // course.isCart = Cart ? true : false
            new ApiResponse_1.SuccessResponse('fetch success', { course }).send(res);
        }));
        this.getPublicById = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { user, parms } = req;
            const course = yield course_repository_1.default.findById(req.params.id);
            //@ts-ignore
            // const Cart = course.Cart.find((subs) => subs.userId === req.user.id)
            // // console.log("isCart",isCart)
            // //   console.log("isSubscribed",isSubscribed);
            // // //   return {
            // // //     isSubscribed: isSubscribed ? true : false,
            // // //     ...channel
            // // //   }
            // // // })
            // //@ts-ignore
            // course.isCart = Cart ? true : false
            new ApiResponse_1.SuccessResponse('fetch success', { course }).send(res);
        }));
        this.getCoureByCategoryId = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { user, parms } = req;
            const course = yield course_repository_1.default.findById(req.query.id);
            //@ts-ignore
            // const Cart = course.Cart.find((subs) => subs.userId === req.user.id)
            // // console.log("isCart",isCart)
            // //   console.log("isSubscribed",isSubscribed);
            // // //   return {
            // // //     isSubscribed: isSubscribed ? true : false,
            // // //     ...channel
            // // //   }
            // // // })
            // //@ts-ignore
            // course.isCart = Cart ? true : false
            new ApiResponse_1.SuccessResponse('fetch success', { course }).send(res);
        }));
        this.getVideoById = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { user, params } = req;
            console.log("params.id", params.id);
            const video = yield video_repository_1.default.findById(params.id);
            new ApiResponse_1.SuccessResponse('fetch success', { video }).send(res);
        }));
        this.createReview = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { body, user } = req;
            console.log("course", body);
            // body.name = body.name.toLowerCase();
            // if (!body.slug) {
            //   body.slug = body.name.slice(0, 2) + "-" + Math.floor((Math.random() * 10000) + 1);
            // }
            body.userId = user.id;
            console.log("body", body);
            const review = yield courseReview_repository_1.default.create({ review: body });
            new ApiResponse_1.SuccessResponse('create success', { review }).send(res);
        }));
        this.updateReview = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { body, params } = req;
            console.log("body", body);
            // body.name = body.name.toLowerCase();
            const course = yield courseReview_repository_1.default.update({ id: params.id, review: body });
            console.log("body", body);
            new ApiResponse_1.SuccessResponse('update success', { course }).send(res);
        }));
        this.getCourseReviewById = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { user, parms } = req;
            const course = yield courseReview_repository_1.default.findById(req.params.id);
            new ApiResponse_1.SuccessResponse('fetch success', { course }).send(res);
        }));
        this.getAllCourseReviewByCourseId = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { user, parms } = req;
            const reviews = yield courseReview_repository_1.default.find(req.params.id);
            new ApiResponse_1.SuccessResponse('fetch success', { reviews }).send(res);
        }));
        this.deleteCourseReview = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { params } = req;
            const category = yield courseReview_repository_1.default.delete(params.id);
            new ApiResponse_1.SuccessResponse('delete success', { category }).send(res);
        }));
    }
}
exports.CourseController = CourseController;
//# sourceMappingURL=course.controller.js.map