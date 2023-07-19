"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenInfo = exports.corsUrl = exports.DATABASE = exports.port = exports.environment = void 0;
require('dotenv').config();
var ENVIROMENT_TYPE;
(function (ENVIROMENT_TYPE) {
    ENVIROMENT_TYPE["development"] = "development";
    ENVIROMENT_TYPE["production"] = "production";
})(ENVIROMENT_TYPE || (ENVIROMENT_TYPE = {}));
// @ts-ignore
exports.environment = process.env.NODE_ENV;
exports.port = process.env.PORT;
exports.DATABASE = {
    development: process.env.DB_URI,
    production: process.env.DB_URI,
};
// console.log({
//   environment,
//   port,
//   DATABASE
// });
exports.corsUrl = ["http://localhost:3000"];
exports.tokenInfo = {
    accessTokenValidityDays: parseInt(process.env.ACCESS_TOKEN_VALIDITY_SEC || '1d'),
    refreshTokenValidityDays: parseInt(process.env.REFRESH_TOKEN_VALIDITY_SEC || '1d'),
    issuer: process.env.DB_URI || 'elect',
    audience: process.env.DB_URI || 'elect',
};
//# sourceMappingURL=config.js.map