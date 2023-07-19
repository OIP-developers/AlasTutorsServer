"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
const routes_1 = require("./routes");
const globals_1 = require("../config/globals");
const Logger_1 = __importDefault(require("../core/Logger"));
const socket_io_handler_1 = require("./socket.io-handler");
class Server {
    constructor() {
        this._app = (0, express_1.default)();
        this._server = (0, http_1.createServer)(this._app);
        this._io = new socket_io_1.default.Server(this._server, {
            cors: {
                origin: "*"
            }
        });
        this._socketEventHandlers = new socket_io_handler_1.SocketEventHandlers(this._io);
        (0, routes_1.initRestRoutes)(this._app);
    }
    listen() {
        Logger_1.default.info(`server starting on port ${globals_1.port} in ${globals_1.environment} mode`);
        this._server.listen(globals_1.port, () => {
            Logger_1.default.info(`server started on port ${globals_1.port} in ${globals_1.environment} mode`);
        });
        this._server.on('listening', () => {
            Logger_1.default.info(`node server is listening on port ${globals_1.port} in ${globals_1.environment} mode`);
        });
    }
    /**
     * Get Express app
     *
     * @returns {express.Application} Returns Express app
     */
    get app() {
        return this._app;
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map