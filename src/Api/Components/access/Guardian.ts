import { prisma, IPrisma, Guardian } from './../../../database';

export const DOCUMENT_NAME = IPrisma.ModelName.Guardian;
export const COLLECTION_NAME = 'guardian';

export default Guardian;

export const GuardianModel = prisma.guardian;
