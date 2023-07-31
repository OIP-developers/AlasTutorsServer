// import { PrismaClient, Prisma } from '@prisma/client'
import { PrismaClient, Prisma } from '@prisma/client'
export {
  User,
  Role,
  Keystore,
  Gender,
  RoleCode,
  Tokenstore,
  Invoice,
  Currency,
  // InvoiceStatus,
  // Category,
  // Product,
  // Example,
  File,
  // Wallet,
  Order,
  // Cart,
  // ProductCategory,
  Course,
  CourseCategory,
  Video
  // CourseSubCategory
  
  // ProductImage,
  // ProductTag,
} from '@prisma/client'
import Logger from '../core/Logger';
import { env, DATABASE, environment } from '../config/globals';

export const prisma = new PrismaClient()
export const IPrisma = Prisma;

// Build the connection string
const enviroment = 'development';
// const dbURI = env.DB[enviroment].uri;
const dbURI = DATABASE[environment];

// {
//   errorFormat: 'pretty',
//   log: ['query', 'info', 'warn', 'error'],
//   debug: true,
//   logger: {
//     log: (e: any) => console.log(e),
//     error: (e: any) => console.error(e),
//     warn: (e: any) => console.warn(e),
//     info: (e: any) => console.info(e),
//   },
// }
// prisma.$on('query', (e: any) => {
//   console.log('Query: ' + e.query)
//   console.log('Params: ' + e.params)
//   console.log('Duration: ' + e.duration + 'ms')
// })

// prisma.$on('beforeExit', async () => {
//   console.log('beforeExit hook')
//   // await prisma.message.create({
//   //   data: {
//   //     message: 'Shutting down server',
//   //   },
//   // })
// })

(async function db() {
  try {
    Logger.info(`Connecting to ${process.env.DATABASE_URL}`);
    await prisma.$connect()
    Logger.info('postgresql connection done');
  } catch (error) {
    Logger.info('postgresql connection error');
    Logger.error(error);
    await prisma.$disconnect()
    process.exit(1)
  }
})()
