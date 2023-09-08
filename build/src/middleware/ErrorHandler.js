"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = require("../core/ApiError");
const Logger_1 = __importDefault(require("../core/Logger"));
// import Logger from "@Core/Logger";
const registerErrorHandler = (router) => {
    router.use((err, req, res, next) => {
        if (err instanceof ApiError_1.ApiError) {
            Logger_1.default.error(err);
            ApiError_1.ApiError.handle(err, res);
        }
        else {
            // console.log('====================================');
            // console.log("CODE", err.code);
            // console.log(err.code, err);
            // console.log('====================================');
            console.log("Error Handler");
            console.log(err);
            if (err.code === "P2003") { // https://www.prisma.io/docs/reference/api-reference/error-reference#p2003
                ApiError_1.ApiError.handle(new ApiError_1.BadRequestError("You can't delete this! his associate data exist in another table"), res);
            }
            if (err.code === 11000) { // Mongoose duplicate key
                const object = Object.keys(err.keyValue);
                const error = `${object[0]} ${err.keyValue[object[0]]} is already Exists`;
                ApiError_1.ApiError.handle(new ApiError_1.InternalError(error), res);
            }
            else if (err.name === "CastError") {
                ApiError_1.ApiError.handle(new ApiError_1.BadRequestError(`Invalid Id, ${err.reason}`), res);
            }
            else if (err.name === 'ValidationError') { // Mongoose validation error
                Object.values(err.errors).map((obj) => {
                    if (obj.kind === 'Number' || obj.kind === 'Number') {
                        ApiError_1.ApiError.handle(new ApiError_1.BadRequestError(`${obj.path} must be ${obj.kind}`), res);
                    }
                    if (obj.kind === 'ObjectId') {
                        ApiError_1.ApiError.handle(new ApiError_1.BadRequestError(`${obj.value} is not a valid value for the ${obj.path} field`), res);
                    }
                    if (obj.kind === 'required') {
                        ApiError_1.ApiError.handle(new ApiError_1.BadRequestError(obj.message), res);
                    }
                    if (obj.kind === 'enum') {
                        ApiError_1.ApiError.handle(new ApiError_1.BadRequestError(`${obj.value} is not a valid value for ${obj.path}`), res);
                    }
                    else {
                        ApiError_1.ApiError.handle(new ApiError_1.BadRequestError("Invalid body!"), res);
                    }
                });
            }
            else {
                ApiError_1.ApiError.handle(new ApiError_1.InternalError(), res);
            }
            // if (env.NODE_ENV === 'development') {
            //     Logger.error(err);
            //     return res.status(500).send(err.message);
            // }
        }
        // let errors: Array<string> = []
        // // API Not Found
        // if (err.message === "Not Found") {
        //     err = new HttpException(404, "Not Found");
        // }
        // // API Not Found
        // if (err.name === "CastError") {
        //     errors.push(`${err.reason}`)
        //     err = new HttpException(400, "Invalid Id", errors);
        // }
        // // Mongoose duplicate key
        // if (err.code === 11000) {
        //     const object = Object.keys(err.keyValue);
        //     const error = `${object[0]} ${err.keyValue[object[0]]} is already Exists`;
        //     errors.push(error)
        //     err = new HttpException(409, "Already Exist!", errors);
        // }
        // // Mongoose validation error
        // if (err.name === 'ValidationError') {
        //     // console.log("ValidationError", err)
        //     Object.values(err.errors).map((obj: any) => {
        //         // console.log(obj)
        //         if (obj.kind === 'Number' || obj.kind === 'Number') {
        //             errors.push(`${obj.path} must be ${obj.kind}`)
        //         }
        //         if (obj.kind === 'ObjectId') {
        //             errors.push(`${obj.value} is not a valid value for the ${obj.path} field`)
        //         }
        //         if (obj.kind === 'required') {
        //             errors.push(obj.message)
        //         }
        //         if (obj.kind === 'enum') {
        //             errors.push(`${obj.value} is not a valid value for ${obj.path}`)
        //         }
        //     });
        //     err = new HttpException(403, "Invalid body!", errors);
        // }
        // res
        //     .status(err.status || 500)
        //     .send({
        //         status: err.status || 500,
        //         message: err.message || "Server Error",
        //         errors: err.errors || []
        //     })
    });
};
exports.default = registerErrorHandler;
//# sourceMappingURL=ErrorHandler.js.map