"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMTP = exports.tokenInfo = exports.corsUrl = exports.env = exports.StripeCred = exports.REDIS_CASHE = exports.DATABASE = exports.slack_port = exports.port = exports.environment = void 0;
require('dotenv').config();
var ENVIROMENT_TYPE;
(function (ENVIROMENT_TYPE) {
    ENVIROMENT_TYPE["development"] = "development";
    ENVIROMENT_TYPE["production"] = "production";
})(ENVIROMENT_TYPE || (ENVIROMENT_TYPE = {}));
// @ts-ignore
exports.environment = process.env.NODE_ENV;
// @ts-ignore
exports.port = process.env.PORT;
// @ts-ignore
exports.slack_port = process.env.SLACK_PORT;
exports.DATABASE = {
    development: process.env.DB_URI,
    production: process.env.DB_URI,
};
exports.REDIS_CASHE = {
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
};
exports.StripeCred = {
    clientSecret: "sk_test_51Lc8HiKuANEC8G8JNHApTgJd1rRqxgYNompouAOAP3L7uaqrpGBbR5hqn5lV7mPhwwkygSaXgTTbsmzUM8S9Gr2U00l1Qjr0Gg",
    development: {
        clientSecret: "sk_test_51Lc8HiKuANEC8G8JNHApTgJd1rRqxgYNompouAOAP3L7uaqrpGBbR5hqn5lV7mPhwwkygSaXgTTbsmzUM8S9Gr2U00l1Qjr0Gg"
    },
    production: {
        clientSecret: "sk_test_51Lc8HiKuANEC8G8JNHApTgJd1rRqxgYNompouAOAP3L7uaqrpGBbR5hqn5lV7mPhwwkygSaXgTTbsmzUM8S9Gr2U00l1Qjr0Gg"
    }
};
// // Environment variables imported from .env file
exports.env = {
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
exports.corsUrl = [];
exports.tokenInfo = {
    accessTokenValidityDays: parseInt('30d'),
    refreshTokenValidityDays: parseInt('30d'),
    issuer: process.env.TOKEN_ISSUER || 'Squabble',
    audience: process.env.TOKEN_AUDIENCE || 'Squabble',
};
exports.SMTP = {
    SENDGRID_API_KEY: "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",
    sender: "hello@squabble.com"
};
//# sourceMappingURL=globals.js.map