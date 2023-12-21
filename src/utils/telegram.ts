/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Context, session, Telegraf } from 'telegraf'
import Logger from '../core/Logger';
import { telegram_config } from '../config/globals'

interface SessionData {
  heyCounter: number
}

interface BotContext extends Context {
  session?: SessionData
}

const token = telegram_config.bot_token || "5611605462:AAHDh5YCquLmt6NTiQOrt_LMH0faw5CH8Fk";
if (token === undefined) {
  throw new Error('BOT_TOKEN must be provided!')
}

export const bot = new Telegraf<BotContext>(token)

bot.use(session())

// Launch bot
bot.launch()
Logger.info(`Telegram Bot launch..`)

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
