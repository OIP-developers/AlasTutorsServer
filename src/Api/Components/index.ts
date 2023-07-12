import { Router, Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../../core/ApiError';
import { AccessRoutes } from './access/access.routes';
import { ExampleRoutes } from './example/example.routes';
import { CategoryRoutes } from './category/category.routes';
import { ProductRoutes } from './product/product.routes';
import { OrderRoutes } from './order/order.routes';
import { FileRoutes } from './Upload/file.routes';
import { CartRoutes } from './cart/cart.routes';
import { CourseCategoryRoutes } from './course-category/course-category.routes';
// import { InvoiceRoutes } from './invoice/invoice.routes'

// import { SubscriptionRoutes } from './subscription/subscription.routes'
// import { InvoiceRoutes } from './invoice/invoice.routes'

export const registerApiRoutes = (router: Router, prefix: string = ''): void => {

  router.get(prefix, (req: Request, res: Response) => res.send('❤'));
  router.use(`${prefix}/emaple`, new ExampleRoutes().router)
  router.use(`${prefix}/category`, new CategoryRoutes().router)
  router.use(`${prefix}/product`, new ProductRoutes().router)
  router.use(`${prefix}/order`, new OrderRoutes().router)
  router.use(`${prefix}/auth`, new AccessRoutes().router)
  router.use(`${prefix}/file`, new FileRoutes().router)
  router.use(`${prefix}/cart`, new CartRoutes().router)
  router.use(`${prefix}/course`, new CartRoutes().router)
  router.use(`${prefix}/course-category`, new CourseCategoryRoutes().router)
  
  // router.use(`${prefix}/invoice`, new InvoiceRoutes().router)
  // export class VideoSubtitlesRoutes {

  // router.use(`${prefix}/subscriptions`, new SubscriptionRoutes().router)
  // router.use(`${prefix}/invoice`, new InvoiceRoutes().router)

  router.use((req: Request, res: Response, next: NextFunction) => next(new NotFoundError()));

}
