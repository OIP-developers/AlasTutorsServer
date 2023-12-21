import DocumentModal, { CourseModel } from './Course';
import { NoDataError } from '../../../core/ApiError';
import mongoose, { Schema, ObjectId } from 'mongoose';
// import { COLLECTION_NAME as COURSE_VIDEO_COLLECTION_NAME } from '../courseVideos/Modal';
import { COLLECTION_NAME as USER_COLLECTION_NAME } from '../../../database/model/User';


interface AggregateCategory extends DocumentModal {
  [x: string]: any,
  courseVideo: {
    [x: string]: any,
  }[]
}

export class Repository {

  public static findWithChild(): Promise<AggregateCategory[]> {
    const CourseWithVideo = CourseModel.aggregate([
      {
        $lookup: {
          from: "COURSE_VIDEO_COLLECTION_NAME",
          let: { courseId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$courseId", "$$courseId"] } } }],
          as: "courseVideo"
        }
      },
      {
        $lookup: {
          from: "users",
          let: { instructorId: "$instructor" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$instructorId"] } } }],
          as: "instructor"
        }
      },
      { $unwind: "$instructor" },
    ]).sort({ createdAt: "desc" }).exec();
    
    return CourseWithVideo
  }

  public static find(): Promise<DocumentModal[]> {
    return CourseModel
      .find({ isDeleted: false })
      .select("-isDeleted -updatedAt")
      .lean<DocumentModal[]>()
      .exec();
  }

  public static findById(id: string): Promise<DocumentModal[]> {
    const CourseIdWithVideo = CourseModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id)
        }
      },
      {
        $lookup: {
          from: "COURSE_VIDEO_COLLECTION_NAME",
          localField: "_id",
          foreignField: "courseId",
          as: "courseVideo",
        },
      },
      {
        $lookup: {
          from: "users",
          let: { instructorId: "$instructor" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$instructorId"] } } }],
          as: "instructor"
        }
      },
      { $unwind: "$instructor" },
    ]).exec();
    return CourseIdWithVideo
  }

  public static async create(body: DocumentModal): Promise<{ data: DocumentModal }> {
    const data = await CourseModel.create({ ...body } as DocumentModal);
    return { data };
  }

  public static async delete(id: string): Promise<{ data: DocumentModal }> {
    const data = await CourseModel.findByIdAndDelete(id, { new: true });
    if (!data) throw new NoDataError();
    return { data };
  }

  public static async update(id: string, body: DocumentModal): Promise<{ data: any }> {
    const data = await CourseModel.findByIdAndUpdate(id, { ...body } as DocumentModal, { new: true, runValidators: true });
    if (!data) throw new NoDataError();
    return { data };
  }

}
