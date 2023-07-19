"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = void 0;
const generateOTP = () => {
    return JSON.stringify(Math.floor(1000 + Math.random() * 9000));
};
exports.generateOTP = generateOTP;
//# sourceMappingURL=otpGenerate.js.map