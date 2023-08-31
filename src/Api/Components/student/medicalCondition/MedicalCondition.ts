import { Prisma, MedicalCondition } from '@prisma/client';
import { prisma } from '../../../../database';

const MedicalConditionModel = prisma.medicalCondition;

type MedicalConditionWhereQuery = Prisma.MedicalConditionWhereInput;
type MedicalConditionUpdateQuery = Prisma.MedicalConditionWhereUniqueInput;

export {
  MedicalCondition,
  MedicalConditionModel,
  MedicalConditionWhereQuery,
  MedicalConditionUpdateQuery,
};
