"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRoutes = void 0;
const express_1 = require("express");
const course_controller_1 = require("./course.controller");
const authentication_1 = __importDefault(require("../../../middleware/authentication"));
class CourseRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new course_controller_1.CourseController();
        this.initRoutes();
    }
    initRoutes() {
        this.router.use('/views', this.controller.getVideoById);
        this.router.get('/public', this.controller.getPublicCourses);
        this.router.get('/public/:id', 
        // authentication,
        this.controller.getByPublicId);
        this.router.get('/:id', authentication_1.default, this.controller.getById);
        this.router.get('/', authentication_1.default, this.controller.getAll);
        this.router.post('/', authentication_1.default, 
        // authorization([RoleEnum.ADMIN]),
        // validator(schema.create),
        this.controller.create);
        // this.router.put(
        //   '/status/:id',
        //   authentication,
        //   authorization([RoleEnum.ADMIN]),
        //   validator(schema.status),
        //   this.controller.statusUpdate
        // )
        this.router.put('/:id', 
        // authentication,
        // authorization([RoleEnum.ADMIN]),
        this.controller.update);
        this.router.delete('/:id', 
        // authentication,
        // authorization([RoleEnum.ADMIN]),
        this.controller.delete);
        this.router.post('/review', authentication_1.default, this.controller.createReview);
        this.router.put('/review/:id', 
        // authentication,
        this.controller.updateReview);
        this.router.get('/review/:id', 
        // authentication,
        this.controller.getCourseReviewById);
        // this.router.get(
        //   '/public/course',
        //   // authentication,
        //   this.controller.getCoureByCategoryId
        // )
        this.router.delete('/review/:id', 
        // authentication,
        this.controller.deleteCourseReview);
        this.router.get('/review/getall/:id', 
        // authentication,
        this.controller.getAllCourseReviewByCourseId);
        this.router.get('/video/:id', this.controller.getVideoById);
    }
}
exports.CourseRoutes = CourseRoutes;
//# sourceMappingURL=course.routes.js.map