import { prisma, IPrisma, User , Address} from '../../../database';

export const DOCUMENT_NAME = IPrisma.ModelName.User;
export const COLLECTION_NAME = 'users';

export default User;

export const UserModel = prisma.user;
