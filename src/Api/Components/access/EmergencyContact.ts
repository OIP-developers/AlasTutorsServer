import { prisma, IPrisma, EmergencyContact } from './../../../database';

export const DOCUMENT_NAME = IPrisma.ModelName.EmergencyContact;
export const COLLECTION_NAME = 'emergencyContact';

export default EmergencyContact;

export const EmergencyContactModel = prisma.emergencyContact;
