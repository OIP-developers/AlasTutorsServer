"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudentSchema = exports.signUpSchema = exports.authBearerSchema = exports.apiKeySchema = exports.employeeUpdateSchema = exports.driverSignupSchema = exports.signupSchema = exports.verifyPassword = exports.refreshToken = exports.userCredential = void 0;
const joi_1 = __importDefault(require("joi"));
const validator_1 = require("../helpers/validator");
exports.userCredential = joi_1.default.object().keys({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required().min(6),
});
exports.refreshToken = joi_1.default.object().keys({
    refreshToken: joi_1.default.string().required().min(1),
});
exports.verifyPassword = joi_1.default.object().keys({
    password: joi_1.default.string().required().min(6),
});
//  export const jj =   auth: Joi.object()
//         .keys({
//             authorization: JoiAuthBearer().required(),
//         })
//         .unknown(true)
exports.signupSchema = joi_1.default.object().keys({
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().required().min(6),
    first_name: joi_1.default.string().required(),
    last_name: joi_1.default.string().required(),
    phone: joi_1.default.string().required(),
    dateOfBirth: joi_1.default.string().optional(),
    gender: joi_1.default.string().optional(),
    referCode: joi_1.default.string().optional(),
    // role: Joi.string().valid('ADMIN', 'USER').required(),
});
exports.driverSignupSchema = joi_1.default.object().keys({
    // username: Joi.string().required(),
    phone: joi_1.default.string().required(),
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().required().min(6),
    first_name: joi_1.default.string().required(),
    last_name: joi_1.default.string().required(),
    profile_picture: (0, validator_1.JoiUrlEndpoint)().optional(),
    dateOfBirth: joi_1.default.date().required(),
    gender: joi_1.default.string().required(),
});
exports.employeeUpdateSchema = joi_1.default.object().keys({
    password: joi_1.default.any().optional(),
    first_name: joi_1.default.string().optional(),
    last_name: joi_1.default.string().optional(),
    email: joi_1.default.string().optional().email(),
    phone: joi_1.default.string().optional(),
    batchId: joi_1.default.string().optional(),
    profile_picture: (0, validator_1.JoiUrlEndpoint)().optional(),
    gender: joi_1.default.string().optional(),
    role: joi_1.default.string().optional(),
    image: joi_1.default.string().optional(),
    status: joi_1.default.boolean().optional(),
});
exports.apiKeySchema = joi_1.default.object().keys({
    'x-api-key': joi_1.default.string().required(),
}).unknown(true);
exports.authBearerSchema = joi_1.default.object().keys({
    authorization: (0, validator_1.JoiAuthBearer)().required(),
}).unknown(true);
exports.signUpSchema = joi_1.default.object({
    students: joi_1.default.array().items(joi_1.default.object({
        first_name: joi_1.default.string().required(),
        middle_name: joi_1.default.string(),
        last_name: joi_1.default.string().required(),
        gender: joi_1.default.string().valid('MALE', 'FEMALE', 'NON_BINARY').required(),
        isPromotionAllowed: joi_1.default.boolean().required(),
        isSiblingEnrolled: joi_1.default.boolean().required(),
        sibling_first_name: joi_1.default.string().allow(""),
        sibling_last_name: joi_1.default.string().allow(""),
        isSpecialEducationNeeds: joi_1.default.boolean().required(),
        dateOfBirth: joi_1.default.string().required(),
        yearGroup: joi_1.default.string().required(),
        medicalCondition: joi_1.default.object({
            isMedicalConditions: joi_1.default.boolean(),
            medicationGiven: joi_1.default.string(),
            typeOfCondition: joi_1.default.string()
        }),
    }).required().custom((student, helpers) => {
        const splittedDob = student.dateOfBirth.split("-");
        if (splittedDob.length !== 3) {
            return helpers.error('Invalid date of birth');
        }
        const dob = new Date(student.dateOfBirth);
        if (!(dob instanceof Date) || dob.getTime() > Date.now()) {
            return helpers.error("Invalid Date");
        }
        return student;
    }, 'custom date of birth validation')),
    parent: joi_1.default.object({
        first_name: joi_1.default.string().required(),
        middle_name: joi_1.default.string().required(),
        last_name: joi_1.default.string().required(),
        phone: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        address: joi_1.default.object({
            line1: joi_1.default.string().required(),
            line2: joi_1.default.string(),
            city: joi_1.default.string().required(),
            postalCode: joi_1.default.string().required(),
            country: joi_1.default.string().required(),
        }),
        mother: joi_1.default.object({
            title: joi_1.default.string().allow('').optional(),
            first_name: joi_1.default.string().allow('').optional(),
            middle_name: joi_1.default.string().allow('').optional(),
            last_name: joi_1.default.string().allow('').optional(),
        }),
        father: joi_1.default.object({
            title: joi_1.default.string().allow('').optional(),
            first_name: joi_1.default.string().allow('').optional(),
            middle_name: joi_1.default.string().allow('').optional(),
            last_name: joi_1.default.string().allow('').optional(),
        })
    }).required(),
    emergencyContact: joi_1.default.object({
        first_name: joi_1.default.string().required(),
        last_name: joi_1.default.string().required(),
        emergency_phone: joi_1.default.string().required(),
        gp_name: joi_1.default.string().required(),
        phone: joi_1.default.string().required(),
        email: joi_1.default.string().email(),
        line1: joi_1.default.string().required(),
        line2: joi_1.default.string(),
        city: joi_1.default.string().required(),
        postalCode: joi_1.default.string().required(),
        country: joi_1.default.string().required(),
    }),
    student_medical: joi_1.default.object({
        isMedicalConditions: joi_1.default.boolean(),
        typeOfCondition: joi_1.default.string(),
        medicationGiven: joi_1.default.string()
    })
});
exports.updateStudentSchema = joi_1.default.object({
    first_name: joi_1.default.string().required(),
    middle_name: joi_1.default.string(),
    id: joi_1.default.string(),
    last_name: joi_1.default.string().required(),
    gender: joi_1.default.string().valid('MALE', 'FEMALE', 'NON_BINARY').required(),
    isPromotionAllowed: joi_1.default.boolean().required(),
    isSiblingEnrolled: joi_1.default.boolean().required(),
    sibling_first_name: joi_1.default.string().allow(""),
    sibling_last_name: joi_1.default.string().allow(""),
    isSpecialEducationNeeds: joi_1.default.boolean().required(),
    dateOfBirth: joi_1.default.string().required(),
    yearGroup: joi_1.default.string().required(),
    medicalCondition: joi_1.default.object({
        isMedicalConditions: joi_1.default.boolean().required(),
        medicationGiven: joi_1.default.string().allow(''),
        typeOfCondition: joi_1.default.string().allow('')
    }).required(),
}).required().custom((student, helpers) => {
    const splittedDob = student.dateOfBirth.split("-");
    if (splittedDob.length !== 3) {
        return helpers.error('Invalid date of birth');
    }
    const dob = new Date(student.dateOfBirth);
    if (!(dob instanceof Date) || dob.getTime() > Date.now()) {
        return helpers.error("Invalid Date");
    }
    return student;
}, 'custom date of birth validation');
//# sourceMappingURL=joi.schema.js.map