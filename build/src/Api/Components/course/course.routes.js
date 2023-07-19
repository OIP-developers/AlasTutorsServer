"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRoutes = void 0;
const express_1 = require("express");
const course_controller_1 = require("./course.controller");
class CourseRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new course_controller_1.CourseController();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/:id', this.controller.getById);
        this.router.get('/', this.controller.getAll);
        this.router.post('/', 
        // authentication,
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
    }
}
exports.CourseRoutes = CourseRoutes;
//# sourceMappingURL=course.routes.js.map