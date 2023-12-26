
import path from 'path'
require('dotenv').config()

enum ENVIROMENT_TYPE {
  development = "development",
  production = "production",
}

// @ts-ignore
export const environment: ENVIROMENT_TYPE = process.env.NODE_ENV;
// @ts-ignore
export const port: number = process.env.PORT;
// @ts-ignore
export const slack_port: number = process.env.SLACK_PORT;

export const DATABASE = {
  development: process.env.DB_URI,
  production: process.env.DB_URI,
}

export const REDIS_CASHE = {
  development: {
    socket: {
      host: "redis-12863.c263.us-east-1-2.ec2.cloud.redislabs.com",
      port: 12863,
    },
    password: "DuGaeLd3ZrtQ79lQBQ9EBzdW43q3qxth"
  },
  production: {
    socket: {
      host: "redis-12863.c263.us-east-1-2.ec2.cloud.redislabs.com",
      port: 12863,
    },
    password: "DuGaeLd3ZrtQ79lQBQ9EBzdW43q3qxth"
  },
}

export const env = {
  DB: {
    [ENVIROMENT_TYPE.development]: { uri: process.env.DB_URI },
    [ENVIROMENT_TYPE.production]: { uri: process.env.DB_URI },
  },
  NODE_ENV: process.env.NODE_ENV || "development",
  NODE_PORT: process.env.NODE_PORT || process.env.PORT || 8000,
  API_VERSION: "v1",
  DOMAIN: process.env.DOMAIN,
  lOGD_IRECTORY: process.env.LOGDIRECTORY || './logs',
};

export const corsUrl: string[] = [""];

export const google_auth = {
  clientID: "934894529981-cupe8hm1uqvdjpfqm082g793lgte3egn.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "https://kingscharts.io/api/v1/auth/google/callback",
}

export const google_storage = {
  keyFilename: path.join(__dirname, "../../keys/kingscharts-storage.json"),
  projectId: "kingscharts",
  bucketName: "kingscharts-video"
}

export const facebook_auth = {
  clientID: "754475985630853",
  clientSecret: "010ea5747a25193e14866bfe5eb4d66c",
  callbackURL: 'http://localhost:5000/api/v1/auth/facebook/callback'
}

export const telegram_config = {
  bot_token: "5611605462:AAHDh5YCquLmt6NTiQOrt_LMH0faw5CH8Fk",
  chatId: "-1001760765420",
  inviteLink: "https://t.me/+N_PGbg4UXqdkZDNk"
}

export const SMTP = {
  SENDGRID_API_KEY: "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",
  SENDGRID_SENDER: "hello@kingscharts.io"
}

export const BtcPay = {
  baseURL: "https://btcpay.kingscharts.io/",
  invoiceURL: "https://btcpay.kingscharts.io/api/v1/stores/G6siHRbzWvywTqJpek3SchnY1yei7MsygKeddxYRFaBN/",
  redirectURL: "http://kingscharts.io/done",
  notificationURL: "https://backend.kingscharts.io/api/invoices/callback",
  Authorization: "Basic bGlRckdrcEhQQjB5SGtZa3lIazdFdk1VTVloaERra01SWU9Va2tscjB2Qg==",
}

export const Coinbase = {
  webhookSecret: 'e0d7298b-eb29-4e79-bbf8-301381588c86'
}

export const tokenInfo = {
  accessTokenValidityDays: parseInt('30d'),
  refreshTokenValidityDays: parseInt('30d'),
  issuer: process.env.TOKEN_ISSUER || 'UnAuthrized',
  audience: process.env.TOKEN_AUDIENCE || 'UnAuthrized',
};

export const StripeCred = {
  // clientSecret: 'pk_test_51Lc8HiKuANEC8G8JnyEVmTrI32B9N8tQaSENdwz4yamiL2SrE2iCl4M5dJYzovq8mu2Db6rm8VLtCBEaB77jhDDx003MjKkjdV'
  clientSecret : 'sk_test_51ORdC2HT10BTLhJJukNuA5ezQ8S5SD326atbKB5axGQLxMSHfIwHKpo4KK4tck8oSB8KRDsyjugw4bCvIqOvyRr400WbmsffyS'
}