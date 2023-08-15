import { Router } from 'express';
import { InvoiceController } from './invoice.controller';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from './schema';
import authentication from '../../../middleware/authentication';
// import raw_body from '../../../middleware/raw-body';
// import authorization from '../../../middleware/authorization';

export class InvoiceRoutes {

  readonly router: Router = Router();
  readonly controller: InvoiceController = new InvoiceController()

  constructor() {
    this.initRoutes();
  }

  initRoutes(): void {

    this.router.post('/payment_intents',
      authentication,
      this.controller.createPaymentIntent
    );

    this.router.get('/payment_intents/confirm/:pi_id',
      authentication,
      this.controller.confirmPaymentIntent
    );

    this.router.get('/my',
      // authentication,
      this.controller.getMyInvoices
    );

    this.router.get('/',
      this.controller.getInvoicesByUser
    );

    this.router.get('/get_ephemeral_key',
      // authentication,
      this.controller.createCardholder
    );

    // this.router.get('/courses',
    //   authentication,
    //   this.controller.getCourses
    // );

    // this.router.get('/verify-invoices',
    //   this.controller.verifyUserIvoices
    // );

  }

}