
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

export const StripeCred = {
  clientSecret: "sk_test_51Lc8HiKuANEC8G8JNHApTgJd1rRqxgYNompouAOAP3L7uaqrpGBbR5hqn5lV7mPhwwkygSaXgTTbsmzUM8S9Gr2U00l1Qjr0Gg",
  development: {
    clientSecret: "sk_test_51Lc8HiKuANEC8G8JNHApTgJd1rRqxgYNompouAOAP3L7uaqrpGBbR5hqn5lV7mPhwwkygSaXgTTbsmzUM8S9Gr2U00l1Qjr0Gg"
  },
  production: {
    clientSecret: "sk_test_51Lc8HiKuANEC8G8JNHApTgJd1rRqxgYNompouAOAP3L7uaqrpGBbR5hqn5lV7mPhwwkygSaXgTTbsmzUM8S9Gr2U00l1Qjr0Gg"
  }
}

// // Environment variables imported from .env file
export const env = {
  DB: {
    [ENVIROMENT_TYPE.development]: { uri: process.env.DB_URI },
    [ENVIROMENT_TYPE.production]: { uri: process.env.DB_URI },
  },
  NODE_ENV: process.env.NODE_ENV || "development",
  NODE_PORT: process.env.NODE_PORT || process.env.PORT || 5000,
  API_VERSION: "v1",
  DOMAIN: process.env.DOMAIN,
  lOGD_IRECTORY: process.env.LOGDIRECTORY || './logs',
};

export const corsUrl: string[] = [];

export const tokenInfo = {
  accessTokenValidityDays: parseInt('30d'),
  refreshTokenValidityDays: parseInt('30d'),
  issuer: process.env.TOKEN_ISSUER || 'Squabble',
  audience: process.env.TOKEN_AUDIENCE || 'Squabble',
};

export const SMTP = {
  SENDGRID_API_KEY: "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", // "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",
  sender: "hello@squabble.com"
}
