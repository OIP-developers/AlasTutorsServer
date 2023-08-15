import { prisma, IPrisma, View } from '../../../../database';

export const DOCUMENT_NAME = IPrisma.ModelName.View;

export default View;

export const ViewModel = prisma.view;