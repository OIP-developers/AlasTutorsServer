import { prisma, IPrisma, Video } from '../../../../database';

export const DOCUMENT_NAME = IPrisma.ModelName.Video;

export default Video;

export const VideoModel = prisma.video;