"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerApiRoutes = void 0;
const ApiError_1 = require("../../core/ApiError");
const access_routes_1 = require("./access.v2/access.routes");
// import { ExampleRoutes } from './example/example.routes';
// import { CategoryRoutes } from './category/category.routes';
// import { ProductRoutes } from './product/product.routes';
// import { OrderRoutes } from './order/order.routes';
const file_routes_1 = require("./Upload/file.routes");
// import { CartRoutes } from './cart/cart.routes';
const course_category_routes_1 = require("./course-category/course-category.routes");
const course_routes_1 = require("./course/course.routes");
const cart_routes_1 = require("./cart/cart.routes");
const order_routes_1 = require("./order/order.routes");
const invoice_routes_1 = require("./invoice/invoice.routes");
const student_routes_1 = require("./student/student.routes");
// import { InvoiceRoutes } from './invoice/invoice.routes'
// import { SubscriptionRoutes } from './subscription/subscription.routes'
// import { InvoiceRoutes } from './invoice/invoice.routes'
const registerApiRoutes = (router, prefix = '') => {
    router.get(prefix, (req, res) => res.send('Alas Tutor ❤'));
    // router.use(`${prefix}/emaple`, new ExampleRoutes().router)
    // router.use(`${prefix}/category`, new CategoryRoutes().router)
    // router.use(`${prefix}/product`, new ProductRoutes().router)
    // router.use(`${prefix}/order`, new OrderRoutes().router)
    router.use(`${prefix}/auth`, new access_routes_1.AccessRoutes().router);
    router.use(`${prefix}/file`, new file_routes_1.FileRoutes().router);
    // router.use(`${prefix}/cart`, new CartRoutes().router)
    // router.use(`${prefix}/course`, new CartRoutes().router)
    router.use(`${prefix}/course-category`, new course_category_routes_1.CourseCategoryRoutes().router);
    router.use(`${prefix}/course`, new course_routes_1.CourseRoutes().router);
    router.use(`${prefix}/cart`, new cart_routes_1.CartRoutes().router);
    router.use(`${prefix}/order`, new order_routes_1.OrderRoutes().router);
    router.use(`${prefix}/invoice`, new invoice_routes_1.InvoiceRoutes().router);
    router.use(`${prefix}/student`, new student_routes_1.StudentRoutes().router);
    // router.use(`${prefix}/invoice`, new InvoiceRoutes().router)
    // export class VideoSubtitlesRoutes {
    // router.use(`${prefix}/subscriptions`, new SubscriptionRoutes().router)
    // router.use(`${prefix}/invoice`, new InvoiceRoutes().router)
    router.use((req, res, next) => next(new ApiError_1.NotFoundError()));
};
exports.registerApiRoutes = registerApiRoutes;
//# sourceMappingURL=index.js.map