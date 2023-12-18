import { Request, Response, NextFunction } from 'express'
import Stripe from 'stripe';
import { BadRequestResponse, SuccessResponse } from '../../../core/ApiResponse';
import { BadRequestError } from '../../../core/ApiError'
import asyncHandler from "../../../helpers/async";
import { InvoiceService } from './invoice.service'
import InvoiceRepo from './invoice.repository'
import { WalletRepo } from '../wallet/wallet.repository'
import Wallet from '../wallet/Wallet'
import Invoice from './Invoice'
import _ from 'lodash'
import Logger from '../../../core/Logger';
import { StripeCred } from '../../../config/globals';
import CartRepo from '../cart/cart.repository';
import { prisma } from '../../../database';

export class InvoiceController {

  readonly stripe: Stripe = new Stripe(StripeCred.clientSecret, { apiVersion: "2022-11-15" });
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
      const customer = await this.createCustomer({ email: req.body.email })
      const customerId = customer.id;
      const role = await prisma.role.findUnique({ where: { code: "ANONYMOUS" } });
      let user = null;
      if (role && role?.id) {
        const isExist = await prisma.user.findFirst({ where: { email: req.body.email } });
        if (isExist) {
          throw new BadRequestResponse("User already exists with this email")
        };
        user = await prisma.user.create({
          data: {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: "NOT_VALID",
            roleId: role.id,
            stripe_customerId: customerId
          }
        });
      }

      if (!user) {
        throw new BadRequestResponse("An Error Occurred")
      };

      const { payment, invoice } = await this.service.paymentIntentCreate({
        body: req.body,
        customerId,
        user: user,
      })

      new SuccessResponse('payment intent successful', { payment, invoice }).send(res);
    }
  )

  confirmPaymentIntent = asyncHandler(
    async (req: any, res: Response, next: NextFunction) => {
      const { user } = req


      const payment = await this.service.paymentIntentRetrieve(req.params.pi_id)
      if (!payment) throw new BadRequestError('payment intent not found');

      let invoice: Invoice | {} = {};
      if (payment.status === 'succeeded' || true) {
        const { invoice: createdInvoice } = await InvoiceRepo.updateByStripe(payment.id, { status: 'paid' } as Invoice)
        invoice = createdInvoice
        // const data = await CartRepo.deleteManyy(user.id)
        // console.log("data")
        res.redirect("http://alastutors.com/thankyou")


        // if (createdInvoice.price) WalletRepo.update(createdInvoice.userId, createdInvoice.price)
      }
      else {
        throw new BadRequestError('Invoice not paid yet!');
      }



      // new SuccessResponse('payment intent successful', {
      //   invoice,
      // }).send(res);
    }
  )


  getMyInvoices = asyncHandler(
    async (req: any, res: Response, next: NextFunction) => {
      const invoices = await InvoiceRepo.findAll({ userId: req.user.id } as Invoice) // req.user._id
      new SuccessResponse('success', { invoices }).send(res);
    }
  )

  getInvoicesByUser = asyncHandler(
    async (req: any, res: Response, next: NextFunction) => {
      const invoices = await InvoiceRepo.findAll(req.query as Invoice) // req.user._id
      new SuccessResponse('success', { invoices }).send(res);
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
