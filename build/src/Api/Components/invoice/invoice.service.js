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
exports.InvoiceService = void 0;
const stripe_1 = __importDefault(require("stripe"));
const globals_1 = require("../../../config/globals");
const user_repository_1 = __importDefault(require("../access/user.repository"));
// import Product, { ProductModel } from '../product/Product'
// import { ProductRepo } from '../product/product.repository'
const Order_1 = require("../order/Order");
// import OrderRepo from '../order/order.repository'
const invoice_repository_1 = __importDefault(require("./invoice.repository"));
const Logger_1 = __importDefault(require("../../../core/Logger"));
class InvoiceService {
    constructor() {
        this.stripe = new stripe_1.default(globals_1.StripeCred.clientSecret, { apiVersion: "2022-11-15" });
    }
    _paymentIntentCreate({ amount, currency, customer, description }) {
        return __awaiter(this, void 0, void 0, function* () {
            const intent = { amount, currency, description, payment_method_types: ['card'] };
            if (customer) {
                intent.customer = customer;
            }
            return this.stripe.paymentIntents.create(intent);
        });
    }
    paymentIntentCreate({ orderId, body, customerId, user }) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            // const Product = await ProductModel.findFirst({ where: { id: body.id } })
            // if (!Product) throw new BadRequestError("Invalid Product")
            const Order = yield Order_1.OrderModel.findFirst({
                where: { id: orderId },
                include: {
                    items: true,
                    user: true
                }
            });
            const email = (_a = user.email) !== null && _a !== void 0 ? _a : undefined;
            const name = (_b = user.first_name) !== null && _b !== void 0 ? _b : undefined;
            if (user.stripe_customerId) {
                const customer = yield this.updateCustomer(user.stripe_customerId, {
                    email: email,
                    name: name,
                });
                customerId = customer.id;
                Logger_1.default.info(`stripe customer updated ${customerId}`);
            }
            else {
                const customer = yield this.createCustomer({
                    email: email,
                    name: name,
                });
                customerId = customer.id;
                Logger_1.default.info(`stripe customer created ${customerId}`);
            }
            let totalAmount = Math.round(Number(Order === null || Order === void 0 ? void 0 : Order.total));
            console.log("totalAmount", totalAmount);
            const payment = yield this._paymentIntentCreate({
                currency: 'usd',
                customer: customerId,
                amount: 200,
                description: "",
            });
            user_repository_1.default.updateInfo(user.id, {
                stripe_customerId: customerId
            });
            const { invoice } = yield invoice_repository_1.default.create({
                stripe: payment.id,
                price: totalAmount,
                orderId: orderId,
                currency: 'USD',
                userId: user.id,
                status: 'initiated',
            });
            return { payment, invoice };
        });
    }
    paymentIntentRetrieve(pi_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.stripe.paymentIntents.retrieve(pi_id);
        });
    }
    createCustomer(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.stripe.customers.create(user);
            return customer;
        });
    }
    updateCustomer(customeId, customer) {
        return __awaiter(this, void 0, void 0, function* () {
            const customerUpdated = yield this.stripe.customers.update(customeId, customer);
            return customerUpdated;
        });
    }
    cardholder(name, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const cardholder = yield this.stripe.issuing.cardholders.create({
                type: 'individual',
                name: name,
                email: email,
                billing: {
                    address: {
                        line1: '1234 Main Street',
                        city: 'San Francisco',
                        state: 'CA',
                        country: 'US',
                        postal_code: '94111',
                    },
                },
            });
            return cardholder;
        });
    }
}
exports.InvoiceService = InvoiceService;
//# sourceMappingURL=invoice.service.js.map