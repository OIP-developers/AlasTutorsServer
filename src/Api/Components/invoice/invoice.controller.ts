import { Request, Response, NextFunction } from 'express'
import Stripe from 'stripe';
import { BadRequestResponse, SuccessResponse } from '../../../core/ApiResponse';
import { BadRequestError } from '../../../core/ApiError'
import asyncHandler from "../../../helpers/async";
import { InvoiceService } from './invoice.service'
import _ from 'lodash'
import Logger from '../../../core/Logger';
import { StripeCred } from '../../../config/globals';
import { UserModel } from '../../../database/model/User';
import { RoleModel } from '../../../database/model/Role';

export class InvoiceController {

  readonly stripe: Stripe = new Stripe(StripeCred.clientSecret, { apiVersion: "2022-08-01" });
  readonly service: InvoiceService = new InvoiceService()

  retrievePaymentIntent = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const payment = await this.service.paymentIntentRetrieve(req.params.pi_id)
      new SuccessResponse('payment intent successful', { payment }).send(res);
    }
  )

  createPaymentIntent = asyncHandler(
    async (req: any, res: Response) => {

      const customerId = req.user.stripe_customerId;

      const { payment, invoice } = await this.service.paymentIntentCreate({
        body: req.body,
        customerId,
        user: req.user,
        orderId: req.body.orderId
      })

      new SuccessResponse('payment intent successful', { payment, invoice }).send(res);
    }
  )

  anonymousCreatePaymentIntent = asyncHandler(
    async (req: any, res: Response) => {
      const email = req.body.email
      const first_name = req.body.first_name
      const last_name = req.body.last_name
      let user = await UserModel.findOne({ email });
      const role = await RoleModel.findOne({ code: "ANONYMOUS" });
      if (!user) {
        user = await UserModel.create({ email, role: role?.id, first_name, last_name });
      }

      if (user && role && role?.id) {
        const customer = await this.createCustomer({ email: user.email })
        const customerId = customer.id;

        const { payment, invoice } = await this.service.paymentIntentCreate({
          body: req.body,
          customerId,
          user: user,
        });

        new SuccessResponse('payment intent successful', { payment, invoice }).send(res);
      }

    }
  )

  confirmPaymentIntent = asyncHandler(
    async (req: any, res: Response, next: NextFunction) => {
      const payment = await this.service.paymentIntentRetrieve(req.params.pi_id)
      if (!payment) throw new BadRequestError('payment intent not found');
      if (payment.status === 'succeeded') {
        res.redirect("http://alastutors.com/thankyou")
      }
      else {
        throw new BadRequestError('Invoice not paid yet!');
      }
    }
  )


  getMyInvoices = asyncHandler(
    async (req: any, res: Response, next: NextFunction) => {
      const invoices: any = [];
      new SuccessResponse('success', { invoices: invoices }).send(res);
    }
  )

  getInvoicesByUser = asyncHandler(
    async (req: any, res: Response, next: NextFunction) => {
      const invoices: any = []
      new SuccessResponse('success', { invoices: invoices }).send(res);
    }
  )

  createCardholder = asyncHandler(
    async (req: any, res: Response, next: NextFunction) => {

      const fullName = req.user.first_name + ' ' + req.user.last_name
      const payment = await this.service.cardholder(fullName, req.user.email)
      new SuccessResponse('payment card holder successful', { payment }).send(res);
    }
  )

  async createCustomer(user: Stripe.CustomerCreateParams) {
    const customer = await this.stripe.customers.create(user);
    return customer;
  }
}
