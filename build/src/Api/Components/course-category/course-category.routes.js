"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseCategoryRoutes = void 0;
const express_1 = require("express");
const course_category_controller_1 = require("./course-category.controller");
const sub_course_category_controller_1 = require("./sub-course-category/sub-course-category.controller");
class CourseCategoryRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new course_category_controller_1.CourseCategoryController();
        this.subController = new sub_course_category_controller_1.SubCourseCategoryController();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/sub-category', this.subController.getAll);
        this.router.get('/:id', this.controller.getById);
        this.router.get('/', this.controller.getAll);
        this.router.post('/', 
        // authentication,
        // authorization([RoleEnum.ADMIN]),
        // validator(schema.create),
        this.controller.create);
        this.router.post('/', 
        // authentication,
        // authorization([RoleEnum.ADMIN]),
        // validator(schema.create),
        this.controller.create);
        this.router.post('/sub-category', 
        // authentication,
        // authorization([RoleEnum.ADMIN]),
        // validator(schema.create),
        this.subController.create);
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
        this.router.put('/sub-category/:id', 
        // authentication,
        // authorization([RoleEnum.ADMIN]),
        this.subController.update);
        this.router.delete('/:id', 
        // authentication,
        // authorization([RoleEnum.ADMIN]),
        this.controller.delete);
        this.router.delete('/sub-category/:id', 
        // authentication,
        // authorization([RoleEnum.ADMIN]),
        this.subController.delete);
    }
}
exports.CourseCategoryRoutes = CourseCategoryRoutes;
//# sourceMappingURL=course-category.routes.js.map