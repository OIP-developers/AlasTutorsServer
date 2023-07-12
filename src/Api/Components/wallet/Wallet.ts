import { prisma, IPrisma, Wallet } from '../../../database';

export const DOCUMENT_NAME = IPrisma.ModelName.Wallet;
export const COLLECTION_NAME = 'users';

export default Wallet;

export const WalletModel = prisma.wallet;
