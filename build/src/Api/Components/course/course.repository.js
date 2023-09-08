"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Course_1 = require("./Course");
class CourseRepo {
    // public static findById(id: Category['id']) {
    // public static findById({ where }: { where: Prisma.CategoryWhereUniqueInput }) {
    //   return CategoryModel.findUnique({ where })
    // }
    // public static findOne({ where }: { where: Prisma.CategoryWhereInput }) {
    //   return CategoryModel.findFirst({ where: { ...where } })
    // }
    // public static async findMany<WhereInput, Delegate>(
    //   { Model, where, search, page = '1', limit = '10', fullTextSearch }: {
    //     Model: Delegate,
    //     where: WhereInput,
    //     search: string | undefined,
    //     page: string,
    //     limit: string,
    //     fullTextSearch: string[]
    //   }
    // ) {
    //   if (search) {
    //     where = {
    //       ...where,
    //       OR: fullTextSearch.map((key) => {
    //         return { name: { search } }
    //       })
    //     }
    //   }
    //   console.log(JSON.stringify(where, null, 2));
    //   // pagination
    //   const crPage = parseInt(page, 10) || 1;
    //   const crLimit = parseInt(limit, 10) || 10;
    //   const startIndex = (crPage - 1) * crLimit;
    //   const endIndex = crPage * crLimit;
    //   // @ts-ignore
    //   const total = await Model.count({ where });
    //   const pages = Math.ceil(total / crLimit)
    //   const pagination: any = {};
    //   pagination.total = total
    //   pagination.pages = pages
    //   if (endIndex < total) {
    //     pagination.next = {
    //       page: crPage + 1,
    //       limit: crLimit,
    //     };
    //   }
    //   if (startIndex > 0) {
    //     pagination.prev = {
    //       page: crPage - 1,
    //       limit: crLimit,
    //     };
    //   }
    //   // @ts-ignore
    //   const entities = await Model.findMany({
    //     where,
    //     skip: crLimit * (crPage - 1),
    //     take: crLimit
    //   })
    //   return { entities, pagination }
    // }
    // public static find({ where }: { where: Prisma.CategoryWhereInput }) {
    //   return CategoryModel.findMany({ where: { isDeleted: false }, orderBy: { createdAt: 'desc' } })
    // }
    // public static async create({ course }: { course: Prisma.CourseCreateInput }) {
    //   console.log("course",course)
    //   return CourseModel.create({
    //  data:course
    //   });
    // }
    static find({ where, include }) {
        return Course_1.CourseModel.findMany({
            where,
            include: Object.assign({ thumbnail: true, videos: true, createdBy: true, Cart: true }, include),
        });
    }
    static create(course) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("course", course);
            return Course_1.CourseModel.create({
                data: {
                    description: course.description,
                    price: course.price,
                    title: course.title,
                    createdById: course.createdById,
                    thumbnailId: course.thumbnailId,
                    bannerId: course.bannerId,
                    currency: course.currency,
                    categoryId: course.categoryId,
                    videos: {
                        create: course.videos.map((video) => {
                            // console.log("mediaId",video.mediaId)
                            // Add courseId to each video, if it's not already present
                            // if (!video.courseId && courseId) {
                            //   video.courseId = courseId;
                            // }
                            return Object.assign({ title: video.title, description: video.description, mediaId: video.mediaId, thumbnailId: video.thumbnailId }, (video.courseId ? { course: { connect: { id: video.courseId } } } : {}));
                        }),
                    },
                    tags: {
                        create: course.tags.map((tag) => {
                            // console.log("mediaId",video.mediaId)
                            // Add courseId to each video, if it's not already present
                            // if (!video.courseId && courseId) {
                            //   video.courseId = courseId;
                            // }
                            return Object.assign({ title: tag }, (tag.courseId ? { course: { connect: { id: tag.courseId } } } : {}));
                        })
                    }
                },
                include: { videos: true },
            });
        });
    }
    // public static async update(id: Course['id'], course: any): Promise<Course | null> {
    //   return CourseModel.update({
    //     where: { id },
    //     data: {
    //       description: course.description,
    //       price: course.price,
    //       title: course.title,
    //       createdById:course.createdById,
    //       thumbnailId:course.thumbnailId,
    //       bannerId:course.bannerId,
    //       currency:course.currency,
    //       categoryId:course.categoryId,
    //       videos: {
    //         updateMany: course.videos.map((video: any): any => {
    //           // console.log("mediaId",video.mediaId)
    //           // Add courseId to each video, if it's not already present
    //           // if (!video.courseId && courseId) {
    //           //   video.courseId = courseId;
    //           // }
    //           const vId=video.vId
    //           return {
    //             id:video.vId,
    //             title: video.title,
    //             description: video.description,
    //             mediaId:video.mediaId,
    //             // mediaId: video.mediaId ? { connect: { id: video.mediaId } } : undefined,
    //             // Connect each video to the course using the courseId
    //             // ...(video.courseId ? { course: { connect: { id: video.courseId } } } : {}),
    //           };
    //         }),
    //       }
    //     },
    //     include: { videos: true },
    //   });
    // }
    static update(id, course) {
        return __awaiter(this, void 0, void 0, function* () {
            return Course_1.CourseModel.update({
                where: { id },
                data: {
                    description: course.description,
                    price: course.price,
                    title: course.title,
                    createdById: course.createdById,
                    thumbnailId: course.thumbnailId,
                    bannerId: course.bannerId,
                    currency: course.currency,
                    categoryId: course.categoryId,
                    // videos: {
                    //   update: course.videos.map((video: any) => ({
                    //     where: { id: video.vId }, // Assuming 'vId' is the video ID
                    //     data: {
                    //       title: video.title,
                    //       description: video.description,
                    //       mediaId: video.mediaId,
                    //     },
                    //   })),
                    // },
                    // videos: {
                    //   updateMany: {
                    //     where: {course.vid},
                    //     data: {
                    //       title:course.video.title,
                    //       description: course.video.description,
                    //       mediaId: course.video.mediaId,
                    //     }
                    //   }
                    //   // updateMany:course.videos.map((video: any): any => {
                    //   //     // // console.log("mediaId",video.mediaId)
                    //   //     // // Add courseId to each video, if it's not already present
                    //   //     // // if (!video.courseId && courseId) {
                    //   //     // //   video.courseId = courseId;
                    //   //     // // }
                    //   //     // const vId=video.vId
                    //   //     // return {
                    //   //     //   id:video.vId,
                    //   //     //   title: video.title,
                    //   //     //   description: video.description,
                    //   //     //   mediaId:video.mediaId,
                    //   //     //   // mediaId: video.mediaId ? { connect: { id: video.mediaId } } : undefined,
                    //   //     //   // Connect each video to the course using the courseId
                    //   //     //   // ...(video.courseId ? { course: { connect: { id: video.courseId } } } : {}),
                    //   //     // };
                    //   //   }),
                    // }
                },
                // include: { 
                //   videos:{
                //     include:{
                //       media:true
                //     }
                //   }
                // },
            });
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return Course_1.CourseModel.delete({
                where: { id }
            });
        });
    }
    static findById(id) {
        return Course_1.CourseModel.findUnique({
            where: { id },
            include: {
                thumbnail: true,
                Cart: true,
                orderItems: true,
                videos: {
                    include: {
                        thumbnail: {}
                    }
                },
                tags: true
            }
        });
    }
    static findCourseByCategoryIdId(categoryId) {
        return Course_1.CourseModel.findUnique({
            //@ts-ignore
            where: { categoryId },
            include: {
                thumbnail: true,
                Cart: true,
                orderItems: true,
                videos: {
                    include: {
                        thumbnail: {}
                    }
                },
                tags: true
            }
        });
    }
}
exports.default = CourseRepo;
//# sourceMappingURL=course.repository.js.map