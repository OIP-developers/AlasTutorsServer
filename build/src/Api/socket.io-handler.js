"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketEventHandlers = void 0;
const Logger_1 = __importDefault(require("../core/Logger"));
class SocketEventHandlers {
    constructor(io) {
        this._io = io;
        this._io.on('connection', (socket) => {
            Logger_1.default.info(`Client connected: ${socket.id}`);
            //@ts-ignore
            socket.connectAt = new Date();
            //@ts-ignore
            this.handleLobbyEvent(socket);
            this.handleRideRquest(socket);
            this.handleRequestEvent(socket);
            this.handleAcceptEvent(socket);
            this.handleRiderArrive(socket);
            this.handleRiderStart(socket);
            this.handleRiderEnd(socket);
            this.handleRiderPayment(socket);
            this.handleOnlinePayment(socket);
            this.handleCashPayment(socket);
            this.handleLocationTracking(socket);
            // setInterval(() => {
            //     this.handleRoomIntervel(socket)
            // }, 10000)
            socket.on('disconnect', () => {
                Logger_1.default.info(`Socket disconnected: ${socket.id}`);
            });
            socket.on('error', (error) => {
                Logger_1.default.error(`Socket error: ${error.message}`);
            });
        });
    }
    /**
     * Handle 'notification' event
     *
     * @param {Socket} socket Socket instance
     */
    handleLobbyEvent(socket) {
        socket.on('JOIN_LOBBY', (data) => {
            console.log(data, typeof data);
            const message = JSON.parse(data);
            socket.user_address = message.user_address;
            Logger_1.default.info(`User Id: ${socket.id} Join Lobby: lobby-${message.gameId}`);
            // Add the user to the lobby room
            socket.join(`lobby-${message.gameId}`);
            const response = {
                type: "USER_JOINED_LOBBY",
                message: `New user (${socket.user_address}) Join this lobby (${message.gameId}) area`,
                userId: socket.id,
                user_address: socket.user_address
            };
            socket.emit("USER_JOINED_LOBBY", response);
            // Notify other users in the lobby that a new user has joined
            socket.to(`lobby-${message.gameId}`).emit("USER_JOINED_LOBBY", response);
        });
        // socket.on('user_disconnect', (user: User) => {
        //   Logger.info(`User disconnect ${user.id} (${user.email})`);
        //   socket.leave("notification")
        // });
    }
    handleRideRquest(socket) {
        socket.on('WAITING_FOR_RIDE', (data) => {
            const message = JSON.parse(data);
            // socket.riderId = message.riderId;
            Logger_1.default.info(`Rider Id: ${message.riderId} Join ride waiting area: WAITING_FOR_RIDE`);
            // Add the user to the lobby room
            socket.join(`RIDE_WAITING_ROOM`);
            const response = {
                type: "NEW_RIDER_JOIN_WAITING_AREA",
                userId: socket.id,
                message: `New rider (${message.riderId}}) Join ride waiting area`,
            };
            // Notify other users in the lobby that a new user has joined
            socket.to(`RIDE_WAITING_ROOM`).emit("NEW_RIDER_JOIN_WAITING_AREA", response);
        });
    }
    handleRequestEvent(socket) {
        socket.on('REQUEST_CREATE', (data) => {
            const message = JSON.parse(data);
            // socket.user_address = message.user_address;
            Logger_1.default.info(`User Id: ${socket.id} Ride status: CREATE_NEW_REQUEST`);
            // Add the user to the lobby room
            socket.join(`RIDE-${message.id}`);
            const response = {
                type: "USER_CREATE_NEW_REQUEST",
                userId: socket.id,
                message: `New user ${message.userId}`,
                param: JSON.stringify(message),
            };
            socket.emit("USER_CREATE_NEW_REQUEST", response);
            // Notify other users in the lobby that a new user has joined
            socket.to("RIDE_WAITING_ROOM").emit("USER_CREATE_NEW_REQUEST", response);
        });
        // socket.on('user_disconnect', (user: User) => {
        //   Logger.info(`User disconnect ${user.id} (${user.email})`);
        //   socket.leave("notification")
        // });
    }
    handleAcceptEvent(socket) {
        socket.on('REQUEST_ACCEPT', (data) => {
            console.log(data, typeof data);
            const message = JSON.parse(data);
            // socket.user_address = message.user_address;
            Logger_1.default.info(`Ride Id: ${message.riderId} Ride leave from: WAITING_FOR_RIDE`);
            // Add the user to the lobby room
            socket.leave('RIDE_WAITING_ROOM');
            socket.join(`RIDE-${message.rideId}`);
            const response = {
                type: "RIDE_REQUEST_ACCEPTED",
                message: `Rider (${message.riderId}) Accept ride (${message.rideId})`,
                userId: socket.id,
                param: { rideId: message.rideId }
            };
            socket.emit("USER_JOINED_LOBBY", response);
            // Notify other users in the lobby that a new user has joined
            socket.to(["RIDE_WAITING_ROOM", `RIDE-${message.rideId}`]).emit("RIDE_REQUEST_ACCEPTED", response);
        });
        // socket.on('user_disconnect', (user: User) => {
        //   Logger.info(`User disconnect ${user.id} (${user.email})`);
        //   socket.leave("notification")
        // });
    }
    handleLocationTracking(socket) {
        socket.on('LIVE_LOCATION', (data) => {
            console.log(data, typeof data);
            const message = JSON.parse(data);
            // socket.user_address = message.user_address;
            Logger_1.default.info(`Ride Id: ${message.riderId} Ride location track: RIDE-${message.rideId}`);
            // Add the user to the lobby room
            // socket.join(`RIDE_WAITING_ROOM`)
            const response = {
                type: "TRACK_LIVE_LOCATION",
                message: `Rider (${socket.id}) Track location (${message.userId})`,
                userId: socket.id,
                param: message
            };
            socket.emit("USER_JOINED_LOBBY", response);
            // Notify other users in the lobby that a new user has joined
            socket.to(`RIDE-${message.rideId}`).emit("TRACK_LIVE_LOCATION", response);
        });
        // socket.on('user_disconnect', (user: User) => {
        //   Logger.info(`User disconnect ${user.id} (${user.email})`);
        //   socket.leave("notification")
        // });
    }
    handleRiderArrive(socket) {
        socket.on('DRIVER_ARRIVED', (data) => {
            console.log(data, typeof data);
            const message = JSON.parse(data);
            // socket.user_address = message.user_address;
            Logger_1.default.info(`Ride Id: ${message.riderId} Rider join room: RIDE-${message.rideId}`);
            // Add the user to the lobby room
            // socket.join(`RIDE-${message.rideId}`)
            const response = {
                type: "DRIVER_ARRIVED_PICKUP_POINT",
                message: `Rider (${socket.id}) Arrived at (${message.userId})`,
                userId: socket.id,
            };
            socket.emit("USER_JOINED_LOBBY", response);
            // Notify other users in the lobby that a new user has joined
            socket.to(`RIDE-${message.rideId}`).emit("DRIVER_ARRIVED_PICKUP_POINT", response);
        });
        // socket.on('user_disconnect', (user: User) => {
        //   Logger.info(`User disconnect ${user.id} (${user.email})`);
        //   socket.leave("notification")
        // });
    }
    handleRiderStart(socket) {
        socket.on('RIDE_START', (data) => {
            console.log(data, typeof data);
            const message = JSON.parse(data);
            // socket.user_address = message.user_address;
            Logger_1.default.info(`Ride Id: ${message.riderId} Start ride: RIDE-${message.rideId}`);
            // Add the user to the lobby room
            // socket.join(`RIDE-${message.rideId}`)
            const response = {
                type: "DRIVER_STARTED_RIDE",
                message: `Rider (${socket.id}) Started ride (${message.userId})`,
                userId: socket.id,
            };
            socket.emit("USER_JOINED_LOBBY", response);
            // Notify other users in the lobby that a new user has joined
            socket.to(`RIDE-${message.rideId}`).emit("DRIVER_STARTED_RIDE", response);
        });
        // socket.on('user_disconnect', (user: User) => {
        //   Logger.info(`User disconnect ${user.id} (${user.email})`);
        //   socket.leave("notification")
        // });
    }
    handleRiderEnd(socket) {
        socket.on('RIDE_END', (data) => {
            console.log(data, typeof data);
            const message = JSON.parse(data);
            // socket.user_address = message.user_address;
            Logger_1.default.info(`Ride Id: ${message.riderId} End ride: RIDE-${message.rideId}`);
            // Add the user to the lobby room
            socket.join(`RIDE_WAITING_ROOM`);
            const response = {
                type: "DRIVER_END_RIDE",
                message: `Rider (${socket.id}) End ride (${message.userId})`,
                userId: socket.id,
            };
            socket.emit("USER_JOINED_LOBBY", response);
            // Notify other users in the lobby that a new user has joined
            socket.to([`RIDE-${message.rideId}`, "RIDE_WAITING_ROOM"]).emit("DRIVER_END_RIDE", response);
            socket.leave(`RIDE-${message.rideId}`);
        });
        // socket.on('user_disconnect', (user: User) => {
        //   Logger.info(`User disconnect ${user.id} (${user.email})`);
        //   socket.leave("notification")
        // });
    }
    handleOnlinePayment(socket) {
        socket.on('ONLINE_PAYMENT', (data) => {
            console.log(data, typeof data);
            const message = JSON.parse(data);
            // socket.user_address = message.user_address;
            Logger_1.default.info(`Ride Id: ${message.riderId} Select Online payment method done: RIDE-${message.rideId}`);
            // Add the user to the lobby room
            // socket.join(`RIDE_WAITING_ROOM`)
            const response = {
                type: "RIDER_RECEIVED_ONLINE_PAYMENT",
                message: `Rider (${socket.id}) Payment done from (${message.userId})`,
                userId: socket.id,
            };
            socket.emit("USER_JOINED_LOBBY", response);
            // Notify other users in the lobby that a new user has joined
            socket.to(`RIDE-${message.rideId}`).emit("RIDER_RECEIVED_ONLINE_PAYMENT", response);
        });
        // socket.on('user_disconnect', (user: User) => {
        //   Logger.info(`User disconnect ${user.id} (${user.email})`);
        //   socket.leave("notification")
        // });
    }
    handleCashPayment(socket) {
        socket.on('CASH_PAYMENT', (data) => {
            console.log(data, typeof data);
            const message = JSON.parse(data);
            // socket.user_address = message.user_address;
            Logger_1.default.info(`Ride Id: ${message.riderId} Ride payment done: RIDE-${message.rideId}`);
            // Add the user to the lobby room
            // socket.join(`RIDE_WAITING_ROOM`)
            const response = {
                type: "RIDE_RECEIVED_CASH_PAYMENT",
                message: `Rider (${socket.id}) Select cash payment method from (${message.userId})`,
                userId: socket.id,
            };
            socket.emit("USER_JOINED_LOBBY", response);
            // Notify other users in the lobby that a new user has joined
            socket.to(`RIDE-${message.rideId}`).emit("RIDE_RECEIVED_CASH_PAYMENT", response);
        });
        // socket.on('user_disconnect', (user: User) => {
        //   Logger.info(`User disconnect ${user.id} (${user.email})`);
        //   socket.leave("notification")
        // });
    }
    handleRiderPayment(socket) {
        socket.on('PAYMENT_DONE', (data) => {
            console.log(data, typeof data);
            const message = JSON.parse(data);
            // socket.user_address = message.user_address;
            Logger_1.default.info(`Ride Id: ${message.riderId} Ride payment done: RIDE-${message.rideId}`);
            // Add the user to the lobby room
            // socket.join(`RIDE_WAITING_ROOM`)
            const response = {
                type: "RIDE_PAYMENT_RECEIVED",
                message: `Rider (${socket.id}) Payment done from (${message.userId})`,
                userId: socket.id,
            };
            socket.emit("USER_JOINED_LOBBY", response);
            // Notify other users in the lobby that a new user has joined
            socket.to(`RIDE-${message.rideId}`).emit("RIDE_PAYMENT_RECEIVED", response);
        });
        // socket.on('user_disconnect', (user: User) => {
        //   Logger.info(`User disconnect ${user.id} (${user.email})`);
        //   socket.leave("notification")
        // });
    }
}
exports.SocketEventHandlers = SocketEventHandlers;
//# sourceMappingURL=socket.io-handler.js.map