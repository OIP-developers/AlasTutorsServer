
import { Prisma } from '@prisma/client';
import Course, { CourseModel } from './Course';


export default class CourseRepo {

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

  public static find(): Promise<Course[] | null> {
    return CourseModel.findMany({
      include: {
        thumbnail:true,
        videos: true,
        createdBy:true,
    
      }
    })
  }

  public static async create(course: any) {
    console.log("course", course)
    return CourseModel.create({
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
          create: course.videos.map((video: any): any => {
            // console.log("mediaId",video.mediaId)
            // Add courseId to each video, if it's not already present
            // if (!video.courseId && courseId) {
            //   video.courseId = courseId;
            // }

            return {
              title: video.title,
              description: video.description,
              mediaId: video.mediaId,
              thumbnailId:video.thumbnailId,
              
              // mediaId: video.mediaId ? { connect: { id: video.mediaId } } : undefined,
              // Connect each video to the course using the courseId
              ...(video.courseId ? { course: { connect: { id: video.courseId } } } : {}),
            };
          }),
        }
      },
      include: { videos: true },
    })
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


  public static async update(id: Course['id'], course: any): Promise<Course | null> {
    return CourseModel.update({
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
  }
  public static async delete(id: Course['id']): Promise<Course | null> {
    return CourseModel.delete({
      where: { id }
    });
  }

  public static findById(id: Course['id']): Promise<Course | null> {
    return CourseModel.findUnique({
      where: { id },
    
      include:{
        thumbnail:true,
        videos:{
          include:{
            thumbnail:{
             
            }
          }
        }
      }

    })
  }

  // public static async statusUpdate({ id, status }: { id: Category['id'], status: Prisma.CategoryUpdateInput }) {
  //   return CategoryModel.update({
  //     where: { id },
  //     data: {
  //       status: status.status
  //     }
  //   });
  // }

  // public static async update(
  //   { id, category }: { id: Category['id'], category: Prisma.CategoryUpdateInput }
  // ) {
  //   // console.log("--------=====",id,category);

  //   return CategoryModel.update({
  //     where: { id },
  //     data: category
  //   });
  // }

  // public static async delete(id: Category['id']) {
  //   return CategoryModel.delete({
  //     where: { id }
  //   });
  // }

}
