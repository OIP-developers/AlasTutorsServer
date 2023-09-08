import { prisma, IPrisma, Address } from './../../../database';

export const DOCUMENT_NAME = IPrisma.ModelName.Address;
export const COLLECTION_NAME = 'address';

export default Address;

export const AddressModel = prisma.address;
