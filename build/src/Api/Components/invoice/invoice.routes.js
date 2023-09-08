"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceRoutes = void 0;
const express_1 = require("express");
const invoice_controller_1 = require("./invoice.controller");
const authentication_1 = __importDefault(require("../../../middleware/authentication"));
// import raw_body from '../../../middleware/raw-body';
// import authorization from '../../../middleware/authorization';
class InvoiceRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new invoice_controller_1.InvoiceController();
        this.initRoutes();
    }
    initRoutes() {
        this.router.post('/payment_intents', authentication_1.default, this.controller.createPaymentIntent);
        this.router.get('/payment_intents/confirm/:pi_id', authentication_1.default, this.controller.confirmPaymentIntent);
        this.router.get('/my', 
        // authentication,
        this.controller.getMyInvoices);
        this.router.get('/', this.controller.getInvoicesByUser);
        this.router.get('/get_ephemeral_key', 
        // authentication,
        this.controller.createCardholder);
        // this.router.get('/courses',
        //   authentication,
        //   this.controller.getCourses
        // );
        // this.router.get('/verify-invoices',
        //   this.controller.verifyUserIvoices
        // );
    }
}
exports.InvoiceRoutes = InvoiceRoutes;
//# sourceMappingURL=invoice.routes.js.map