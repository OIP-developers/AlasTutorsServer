"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRestRoutes = void 0;
const globals_1 = require("../config/globals");
const Components_1 = require("./Components");
const ErrorHandler_1 = __importDefault(require("../middleware/ErrorHandler"));
const Register_1 = __importDefault(require("../middleware/Register"));
const apiTrack_1 = require("../middleware/apiTrack");
const Logger_1 = __importDefault(require("../core/Logger"));
/**
 * Init Express REST routes
 *
 * @param {Router} router
 * @returns {void}
 */
function initRestRoutes(router) {
    const prefix = `/api/${globals_1.env.API_VERSION}`;
    Logger_1.default.info(`Initializing REST routes on ${prefix}`);
    (0, Register_1.default)(router);
    // registerApiKey(router, `${prefix}/auth`); // x-api-key for authentication
    // authentication(router, `${prefix}/auth`);
    (0, apiTrack_1.trackApiKey)(router, prefix);
    (0, Components_1.registerApiRoutes)(router, prefix);
    (0, ErrorHandler_1.default)(router);
}
exports.initRestRoutes = initRestRoutes;
//# sourceMappingURL=routes.js.map