import { prisma, IPrisma } from '../../../database';
import User from './User';

export const DOCUMENT_NAME = IPrisma.ModelName.Keystore;
export const COLLECTION_NAME = 'keystores';

export default interface Keystore {
  client: User;
  clientId: User["id"];
  primaryKey: string;
  secondaryKey: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// schema.index({ client: 1, primaryKey: 1 });
// schema.index({ client: 1, primaryKey: 1, secondaryKey: 1 });

export const KeystoreModel = prisma.keystore;
