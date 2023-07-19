"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = (execution) => (req, res, next) => Promise
    .resolve(execution(req, res, next))
    .catch((error) => next(error));
exports.default = asyncHandler;
//# sourceMappingURL=async.js.map