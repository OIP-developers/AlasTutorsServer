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
exports.InvoiceController = void 0;
const stripe_1 = __importDefault(require("stripe"));
const ApiResponse_1 = require("../../../core/ApiResponse");
const ApiError_1 = require("../../../core/ApiError");
const async_1 = __importDefault(require("../../../helpers/async"));
const invoice_service_1 = require("./invoice.service");
const invoice_repository_1 = __importDefault(require("./invoice.repository"));
const globals_1 = require("../../../config/globals");
const cart_repository_1 = __importDefault(require("../cart/cart.repository"));
class InvoiceController {
    constructor() {
        this.stripe = new stripe_1.default(globals_1.StripeCred.clientSecret, { apiVersion: "2022-11-15" });
        this.service = new invoice_service_1.InvoiceService();
        this.retrievePaymentIntent = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const payment = yield this.service.paymentIntentRetrieve(req.params.pi_id);
            new ApiResponse_1.SuccessResponse('payment intent successful', { payment }).send(res);
        }));
        this.createPaymentIntent = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const customerId = req.user.stripe_customerId;
            console.log("customerId", customerId);
            const { payment, invoice } = yield this.service.paymentIntentCreate({
                body: req.body,
                customerId,
                user: req.user,
                orderId: req.body.orderId
            });
            new ApiResponse_1.SuccessResponse('payment intent successful', { payment, invoice }).send(res); //  invoice, payment 
        }));
        this.confirmPaymentIntent = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const payment = yield this.service.paymentIntentRetrieve(req.params.pi_id);
            if (!payment)
                throw new ApiError_1.BadRequestError('payment intent not found');
            let invoice = {};
            if (payment.status === 'succeeded' || true) {
                const { invoice: createdInvoice } = yield invoice_repository_1.default.updateByStripe(payment.id, { status: 'paid' });
                invoice = createdInvoice;
                const data = yield cart_repository_1.default.deleteManyy(user.id);
                console.log("data");
                res.redirect("https://alas-tutors-dashboard.vercel.app/my-cart/success/");
                // if (createdInvoice.price) WalletRepo.update(createdInvoice.userId, createdInvoice.price)
            }
            else {
                throw new ApiError_1.BadRequestError('Invoice not paid yet!');
            }
            // new SuccessResponse('payment intent successful', {
            //   invoice,
            // }).send(res);
        }));
        this.getMyInvoices = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const invoices = yield invoice_repository_1.default.findAll({ userId: req.user.id }); // req.user._id
            new ApiResponse_1.SuccessResponse('success', { invoices }).send(res);
        }));
        this.getInvoicesByUser = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const invoices = yield invoice_repository_1.default.findAll(req.query); // req.user._id
            new ApiResponse_1.SuccessResponse('success', { invoices }).send(res);
        }));
        this.createCardholder = (0, async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const fullName = req.user.first_name + ' ' + req.user.last_name;
            const payment = yield this.service.cardholder(fullName, req.user.email);
            new ApiResponse_1.SuccessResponse('payment card holder successful', { payment }).send(res);
        }));
    }
}
exports.InvoiceController = InvoiceController;
//# sourceMappingURL=invoice.controller.js.map