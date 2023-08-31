import Joi from 'joi';
import { JoiAuthBearer, JoiUrlEndpoint } from '../helpers/validator';

export const userCredential = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
})

export const refreshToken = Joi.object().keys({
  refreshToken: Joi.string().required().min(1),
})

export const verifyPassword = Joi.object().keys({
  password: Joi.string().required().min(6),
})

//  export const jj =   auth: Joi.object()
//         .keys({
//             authorization: JoiAuthBearer().required(),
//         })
//         .unknown(true)

export const signupSchema = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  phone: Joi.string().required(),
  dateOfBirth: Joi.string().optional(),
  gender: Joi.string().optional(),
  referCode: Joi.string().optional(),
  // role: Joi.string().valid('ADMIN', 'USER').required(),
})

export const driverSignupSchema = Joi.object().keys({
  // username: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  profile_picture: JoiUrlEndpoint().optional(),
  dateOfBirth: Joi.date().required(),
  gender: Joi.string().required(),
})

export const employeeUpdateSchema = Joi.object().keys({
  password: Joi.any().optional(),
  first_name: Joi.string().optional(),
  last_name: Joi.string().optional(),
  email: Joi.string().optional().email(),
  phone: Joi.string().optional(),
  batchId: Joi.string().optional(),
  profile_picture: JoiUrlEndpoint().optional(),
  gender: Joi.string().optional(),
  role: Joi.string().optional(),
  image: Joi.string().optional(),
  status: Joi.boolean().optional(),
})

export const apiKeySchema = Joi.object().keys({
  'x-api-key': Joi.string().required(),
}).unknown(true)

export const authBearerSchema = Joi.object().keys({
  authorization: JoiAuthBearer().required(),
}).unknown(true)


export const signUpSchema = Joi.object({
  students: Joi.array().items(Joi.object({
    first_name: Joi.string().required(),
    middle_name: Joi.string(),
    last_name: Joi.string().required(),
    gender: Joi.string().valid('MALE', 'FEMALE', 'NON_BINARY').required(),
    isPromotionAllowed: Joi.boolean().required(),
    isSiblingEnrolled: Joi.boolean().required(),
    sibling_first_name: Joi.string().allow(""),
    sibling_last_name: Joi.string().allow(""),
    isSpecialEducationNeeds: Joi.boolean().required(),
    dateOfBirth: Joi.string().required(),
    yearGroup: Joi.string().required(),
    medicalCondition: Joi.object({
      isMedicalConditions: Joi.boolean(),
      medicationGiven: Joi.string(),
      typeOfCondition: Joi.string()
    }),
  }).required().custom((student, helpers) => {
    const splittedDob = student.dateOfBirth.split("-");

    if (splittedDob.length !== 3) {
      return helpers.error('Invalid date of birth');
    }

    const dob = new Date(student.dateOfBirth);

    if (!(dob instanceof Date) || dob.getTime() > Date.now()) {
      return helpers.error("Invalid Date")
    }
    return student;
  }, 'custom date of birth validation'),),
  parent: Joi.object({
    first_name: Joi.string().required(),
    middle_name: Joi.string().required(),
    last_name: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    address: Joi.object({
      line1: Joi.string().required(),
      line2: Joi.string(),
      city: Joi.string().required(),
      postalCode: Joi.string().required(),
      country: Joi.string().required(),
    }),
    mother: Joi.object({
      title: Joi.string().allow('').optional(),
      first_name: Joi.string().allow('').optional(),
      middle_name: Joi.string().allow('').optional(),
      last_name: Joi.string().allow('').optional(),
    }),
    father: Joi.object({
      title: Joi.string().allow('').optional(),
      first_name: Joi.string().allow('').optional(),
      middle_name: Joi.string().allow('').optional(),
      last_name: Joi.string().allow('').optional(),
    })
  }).required(),
  emergencyContact: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    emergency_phone: Joi.string().required(),
    gp_name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email(),
    line1: Joi.string().required(),
    line2: Joi.string(),
    city: Joi.string().required(),
    postalCode: Joi.string().required(),
    country: Joi.string().required(),
  }),
  student_medical: Joi.object({
    isMedicalConditions: Joi.boolean(),
    typeOfCondition: Joi.string(),
    medicationGiven: Joi.string()
  })
});

export const updateStudentSchema = Joi.object({
  first_name: Joi.string().required(),
  middle_name: Joi.string(),
  id: Joi.string(),
  last_name: Joi.string().required(),
  gender: Joi.string().valid('MALE', 'FEMALE', 'NON_BINARY').required(),
  isPromotionAllowed: Joi.boolean().required(),
  isSiblingEnrolled: Joi.boolean().required(),
  sibling_first_name: Joi.string().allow(""),
  sibling_last_name: Joi.string().allow(""),
  isSpecialEducationNeeds: Joi.boolean().required(),
  dateOfBirth: Joi.string().required(),
  yearGroup: Joi.string().required(),
  medicalCondition: Joi.object({
    isMedicalConditions: Joi.boolean().required(),
    medicationGiven: Joi.string().allow(''),
    typeOfCondition: Joi.string().allow('')
  }).required(),
}).required().custom((student, helpers) => {
  const splittedDob = student.dateOfBirth.split("-");

  if (splittedDob.length !== 3) {
    return helpers.error('Invalid date of birth');
  }

  const dob = new Date(student.dateOfBirth);

  if (!(dob instanceof Date) || dob.getTime() > Date.now()) {
    return helpers.error("Invalid Date")
  }
  return student;
}, 'custom date of birth validation')

