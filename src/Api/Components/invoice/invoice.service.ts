import Stripe from 'stripe';
import { BadRequestError } from '../../../core/ApiError';
import { StripeCred } from "../../../config/globals"
import Logger from '../../../core/Logger';
import { InvoiceModel } from './invoice.entity';

export class InvoiceService {

  readonly stripe: Stripe = new Stripe(StripeCred.clientSecret, { apiVersion: "2022-08-01" });

  async _paymentIntentCreate(amount: number, customer: any) {
    const intent: any = { amount, currency: "GBP", description: "Registration Discount Payment", payment_method_types: ['card'] };
    if (customer) {
      intent.customer = customer;
    }
    return this.stripe.paymentIntents.create(intent);
  }

  async paymentIntentCreate(
    { body, customerId, user }: { orderId?: string, body: any, customerId: null | string, user: any }
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

    
    const payment = await this._paymentIntentCreate(totalAmount * 100, customerId)
    return { payment, invoice: {} };
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