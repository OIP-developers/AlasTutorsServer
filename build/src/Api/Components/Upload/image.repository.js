"use strict";
// import { Request } from "express"
// import File, { FileModel } from './File';
// // import { v2 as cloudinary } from "cloudinary";
// import { BadRequestError } from '../../../core/ApiError';
// import { CloudinaryResponse } from "./interface"
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRepo = void 0;
const File_1 = require("./File");
class FileRepo {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("datadatadata", data);
            let file = yield File_1.FileModel.create({ data });
            return { file };
        });
    }
}
exports.FileRepo = FileRepo;
//# sourceMappingURL=image.repository.js.map