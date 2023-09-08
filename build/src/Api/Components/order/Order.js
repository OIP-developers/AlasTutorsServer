"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemsModel = exports.OrderModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const database_1 = require("../../../database");
exports.DOCUMENT_NAME = database_1.IPrisma.ModelName.Order;
exports.COLLECTION_NAME = "Orders";
exports.OrderModel = database_1.prisma.order;
exports.OrderItemsModel = database_1.prisma.orderItems;
//# sourceMappingURL=Order.js.map