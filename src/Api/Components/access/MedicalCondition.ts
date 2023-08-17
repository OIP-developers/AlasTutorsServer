import { prisma, IPrisma, MedicalCondition } from './../../../database';

export const DOCUMENT_NAME = IPrisma.ModelName.MedicalCondition;
export const COLLECTION_NAME = 'medicalCondition';

export default MedicalCondition;

export const MedicalConditionModel = prisma.medicalCondition;
