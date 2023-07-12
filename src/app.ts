
import { config } from 'dotenv'
import { Server } from './Api/server'
// import { RedisServer } from './database/redis'
import Logger from './core/Logger';
// import logger from "@Core/Logger";
import { prisma } from "./database"
// import './database/redis'
// import { redis_client } from './database/redis'

config();

(async function main(): Promise<void> {
  try {

    await prisma.$connect()

    process.on('uncaughtException', (e) => {
      Logger.error(e);
    });

    // Init express server
    const server = new Server()

    server.listen()

  } catch (err: any) {
    console.log(err);
    Logger.error(err.stack);
  }
})();
