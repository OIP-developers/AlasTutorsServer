import { prisma, IPrisma, File } from '../../../database';

export const DOCUMENT_NAME = IPrisma.ModelName.File;

export default File;

export const FileModel = prisma.file;
