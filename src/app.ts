
import { config } from 'dotenv'
import { Server } from './Api/server'
import Logger from './core/Logger';
import { connect } from './database';
import cors from 'cors'
import helmet from 'helmet'

config();

(async function main(): Promise<void> {
  try {

    await connect()

    // Init express server
    const server = new Server()
    
    // Enable CORS middleware
    server.app.use(cors({
      origin: '*'
    }));

    // Enhance security with Helmet middleware
    server.app.use(helmet());


    // Start express server
    server.listen();

    process.on('SIGINT', () => Logger.error('SIGINT', { service: 'app-initialize' }));
    process.on('SIGTERM', () => Logger.error('SIGTERM', { service: 'app-initialize' }));
    process.on('uncaughtException', (e: any) => {
      Logger.error(e, { service: 'app-initialize' });
    });

  } catch (err: any) {
    Logger.error(err, { service: 'app-initialize' });
  }
})();
