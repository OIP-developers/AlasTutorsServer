import DocumentModal, { CourseModel } from './Course';
import { NoDataError } from '../../../core/ApiError';
import mongoose from 'mongoose';
import { COLLECTION_NAME as COURSE_VIDEO_COLLECTION_NAME } from '../courseVideos/Modal';
import { USER_COLLECTION_NAME } from '../../../database/model/User';
import { COLLECTION_NAME as QUESTION_COLLECTION_NAME } from '../courseVideos/Question';
import { COLLECTION_NAME as ANSWER_COLLECTION_NAME } from '../courseVideos/Answer';
import { COLLECTION_NAME as VIEWS_COLLECTION_NAME } from '../courseVideos/Views';
import { COLLECTION_NAME as EXPRESSIONS_COLLECTION_NAME } from '../courseVideos/Expressions';


interface AggregateCategory extends DocumentModal {
  [x: string]: any,
  courseVideo: {
    [x: string]: any,
  }[]
}

export class Repository {

  public static findWithOneChild(): Promise<AggregateCategory[]> {
    const CourseWithVideo = CourseModel.aggregate([
      {
        $lookup: {
          from: COURSE_VIDEO_COLLECTION_NAME,
          let: { courseId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$courseId", "$$courseId"] } } },
            { $sample: { size: 1 } }
          ],
          as: "courseVideo"
        }
      },
      {
        $addFields: {
          courseVideo: {
            $arrayElemAt: ['$courseVideo', 0]
          }
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
      {
        "$project": {
          "instructor.password": 0,
          "instructor.role": 0,
          "instructor.business": 0,
          "instructor.date_of_birth": 0,
          "instructor.businessQuestionsAnswered": 0,
          "instructor.phone": 0,
          "instructor.createdBy": 0,
          "instructor.createdAt": 0,
          "instructor.updatedAt": 0,
          "instructor.status": 0,
      
          "_id": 1,
          "isPublish": 0,
          "isDeleted": 0,
          "createdAt": 0,
          "updatedAt": 0,
          "number_of_lessons": 0,
        }
      }
      

    ]).sort({ createdAt: "desc" }).exec();

    return CourseWithVideo
  }

  public static findWithChild(): Promise<AggregateCategory[]> {
    const CourseWithVideo = CourseModel.aggregate([
      {
        $lookup: {
          from: COURSE_VIDEO_COLLECTION_NAME,
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

  public static findById(id: string, userId?: string): Promise<DocumentModal[]> {

    const CourseIdWithVideo = CourseModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id)
        },
      },
      {
        $lookup: {
          from: COURSE_VIDEO_COLLECTION_NAME,
          let: { courseId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$courseId", "$$courseId"] } } },
            {
              $lookup: {
                from: QUESTION_COLLECTION_NAME,
                let: { questionId: "$_id" },
                pipeline: [
                  { $match: { $expr: { $eq: ["$video", "$$questionId"] } } },
                  { $sort: { 'createdAt': -1 } },

                  {
                    $lookup: {
                      from: USER_COLLECTION_NAME,
                      let: { userId: "$user" },
                      pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$userId"] } } },
                        // include only _id , profilePicUrl , first_name  and last_name field
                        { "$project": { "_id": 1, "profilePicUrl": 1, "first_name": 1, "last_name": 1 } }
                      ],
                      as: "user"
                    }
                  },
                  { $unwind: "$user" },
                  {
                    $lookup: {
                      from: ANSWER_COLLECTION_NAME,
                      let: { questionsId: "$_id" },
                      pipeline: [
                        { $match: { $expr: { $eq: ["$question", "$$questionsId"] } } },
                        { $sort: { 'createdAt': -1 } },
                        {
                          $lookup: {
                            from: "users",
                            let: { userId: "$user" },
                            pipeline: [
                              { $match: { $expr: { $eq: ["$_id", "$$userId"] } } },
                              // include only _id , profilePicUrl , first_name  and last_name field
                              { "$project": { "_id": 1, "profilePicUrl": 1, "first_name": 1, "last_name": 1 } }
                            ],
                            as: "user"
                          }
                        },
                        { $unwind: "$user" },

                      ],
                      as: "answers"
                    }
                  },

                ],
                as: "questions"
              }
            },
            {
              $lookup: {
                from: VIEWS_COLLECTION_NAME,
                let: { viewId: "$_id" },
                pipeline: [
                  { $match: { $expr: { $eq: ["$video", "$$viewId"] } } },
                  {
                    $group: {
                      _id: "null",
                      count: {
                        $sum: 1
                      },
                      currentUserViewExist: {
                        "$sum": {
                          "$cond": [
                            {
                              "$and": [
                                { "$eq": ["$user", userId] },
                              ]
                            },
                            1,
                            0
                          ]
                        }
                      }
                    }
                  },
                  { $project: { _id: 0 } }
                ],
                as: "views"
              }
            },
            {
              $lookup: {
                from: EXPRESSIONS_COLLECTION_NAME,
                let: { expressId: "$_id" },
                pipeline: [
                  { $match: { $expr: { $eq: ["$video", "$$expressId"] } } },
                  {
                    $group: {
                      _id: null,
                      count: {
                        $sum: { "$cond": [{ "$eq": ["$expression", "DISLIKE"] }, 1, 0] }
                      },
                      currentUserDislikeExist: {
                        "$sum": {
                          "$cond": [
                            {
                              "$and": [
                                { "$eq": ["$user", userId] },
                                { "$eq": ["$expression", "DISLIKE"] },
                              ]
                            },
                            1,
                            0
                          ]
                        }
                      }
                    }
                  },
                  { $project: { _id: 0 } }
                ],
                as: "dislikes"
              }
            },
            {
              $lookup: {
                from: EXPRESSIONS_COLLECTION_NAME,
                let: { expressId: "$_id" },
                pipeline: [
                  { $match: { $expr: { $eq: ["$video", "$$expressId"] } } },
                  {
                    $group: {
                      _id: null,
                      count: {
                        $sum: { "$cond": [{ "$eq": ["$expression", "LIKE"] }, 1, 0] }
                      },
                      currentUserLikeExist: {
                        "$sum": {
                          "$cond": [
                            {
                              "$and": [
                                { "$eq": ["$user", userId] },
                                { "$eq": ["$expression", "LIKE"] },
                              ]
                            },
                            1,
                            0
                          ]
                        }
                      }
                    }
                  },
                  { $project: { _id: 0 } }
                ],
                as: "likes"
              }
            },
          ],
          as: "courseVideo"
        }
      },
      {
        $lookup: {
          from: USER_COLLECTION_NAME,
          let: { instructorId: "$instructor" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$instructorId"] } } },
            // include only _id , profilePicUrl , first_name  and last_name field
            { "$project": { "_id": 1, "profilePicUrl": 1, "first_name": 1, "last_name": 1 } }
          ],
          as: "instructor"
        }
      },
      { $unwind: "$instructor" },

      // remove status and updatedAt field
      { "$project": { "updatedAt": 0 } }


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
