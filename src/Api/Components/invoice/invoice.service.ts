import Stripe from 'stripe';
import { BadRequestError } from '../../../core/ApiError';
import { StripeCred } from "../../../config/globals"
import UserRepo from '../access/user.repository'
import User, { DOCUMENT_NAME as USER_DOCUMENT_NAME } from "../access/User"
// import Product, { ProductModel } from '../product/Product'
// import { ProductRepo } from '../product/product.repository'
import Order, { OrderModel } from '../order/Order'
// import OrderRepo from '../order/order.repository'
import InvoiceRepo from './invoice.repository'
import Logger from '../../../core/Logger';
import Invoice from './Invoice';

export class InvoiceService {

  readonly stripe: Stripe = new Stripe(StripeCred.clientSecret, { apiVersion: "2022-11-15" });

  async _paymentIntentCreate(
    { amount, currency, customer, description }: { amount: number, description: string, currency: 'usd', customer?: string | null }
  ) {
    const intent: any = { amount, currency, description, payment_method_types: ['card'] };
    if (customer) {
      intent.customer = customer;
    }
    return this.stripe.paymentIntents.create(intent);
  }

  async paymentIntentCreate(
    { body, customerId, user }: { orderId?: string, body: any, customerId: null | string, user: User }
  ) {

    const email: string | undefined = user.email ?? undefined;
    const name: string | undefined = user.first_name ?? undefined;

    if (user.stripe_customerId) {
      const customer = await this.updateCustomer(user.stripe_customerId, {
        email: email,
        name: name,
      })
      customerId = customer.id;
      Logger.info(`stripe customer updated ${customerId}`);
    } else {
      const customer = await this.createCustomer({
        email: email,
        name: name,
      })
      customerId = customer.id;
      Logger.info(`stripe customer created ${customerId}`);
    }

    let totalAmount = 20;

    const payment = await this._paymentIntentCreate({
      currency: 'usd',
      customer: customerId,
      amount: body.amount * 100,
      description: "",
    })


    UserRepo.updateInfo(user.id, {
      stripe_customerId: customerId
    } as User)

    const { invoice } = await InvoiceRepo.create({
      stripe: payment.id,
      price: totalAmount,
      currency: 'USD',
      userId: user.id,
      status: 'initiated',
    } as Invoice);

    return { payment, invoice };
  }

  async paymentIntentRetrieve(pi_id: string) {
    return this.stripe.paymentIntents.retrieve(pi_id);
  }

  async createCustomer(user: Stripe.CustomerCreateParams) {
    const customer = await this.stripe.customers.create(user);
    return customer;
  }

  async updateCustomer(customeId: string, customer: Stripe.CustomerCreateParams) {
    const customerUpdated = await this.stripe.customers.update(customeId, customer);
    return customerUpdated;
  }

  async cardholder(name: string, email: string): Promise<Stripe.Issuing.Cardholder | null> {

    const cardholder = await this.stripe.issuing.cardholders.create({
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
  }

}