"use strict";
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
const Example_1 = require("./Example");
class ExampleRepo {
    static findById(id) {
        return Example_1.ExampleModel.findUnique({ where: { id } });
    }
    static findOne(example) {
        return Example_1.ExampleModel.findFirst({ where: example });
    }
    static find() {
        return Example_1.ExampleModel.findMany({ where: { isPublish: true, isDeleted: false }, orderBy: { createdAt: 'desc' } });
    }
    static create(example) {
        return __awaiter(this, void 0, void 0, function* () {
            return Example_1.ExampleModel.create({
                data: Object.assign({}, example)
            });
        });
    }
    static update(id, example) {
        return __awaiter(this, void 0, void 0, function* () {
            return Example_1.ExampleModel.update({
                where: { id },
                data: example
            });
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return Example_1.ExampleModel.delete({
                where: { id }
            });
        });
    }
}
exports.default = ExampleRepo;
//# sourceMappingURL=example.repository.js.map