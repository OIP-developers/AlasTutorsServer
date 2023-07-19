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
exports.generateCode = void 0;
function generateCode(length, minRange, maxRange, contain) {
    return __awaiter(this, void 0, void 0, function* () {
        let characters = "";
        let code = "";
        // Define the range of characters based on the provided specifications
        if (contain === "numbers") {
            characters = "0123456789";
        }
        else if (contain === "letters") {
            characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        }
        else {
            characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        }
        // Generate the code by selecting random characters from the defined range
        for (let i = 0; i < length; i++) {
            code += characters.charAt(Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange);
        }
        return code;
    });
}
exports.generateCode = generateCode;
//# sourceMappingURL=generate.js.map