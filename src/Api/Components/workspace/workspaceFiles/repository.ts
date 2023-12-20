import DocumentModal, { WorkspaceFileModal as Modal } from './workspaceFile';
import { COLLECTION_NAME as FILE_COMMENT_COLLECTION_NAME } from '../../comments/Modal';
import { USER_COLLECTION_NAME } from '../../../../database/model/User';
import { NoDataError } from '../../../../core/ApiError';
import { Schema } from 'mongoose';

export class Repository {

  public static find(query: any): Promise<DocumentModal[]> {
    return Modal
      .find({ ...query })
      .select("-isDeleted -updatedAt")
      .lean<DocumentModal[]>()
      .exec();
  }

  public static findById(id: Schema.Types.ObjectId): Promise<DocumentModal> {
    return Modal
      .findById(id)
      .select("-isDeleted -updatedAt")
      .lean<DocumentModal>()
      .exec();
  }

  public static async create(body: DocumentModal): Promise<{ data: DocumentModal }> {
    const data = await Modal.create({ ...body } as DocumentModal);
    return { data };
  }

  public static async delete(id: string): Promise<{ data: DocumentModal }> {
    const data = await Modal.findByIdAndDelete(id, { new: true });
    if (!data) throw new NoDataError();
    return { data };
  }

  public static async deleteMany(body: any): Promise<{ data: any }> {
    const data = await Modal.deleteMany({ ...body })
    if (!data) throw new NoDataError();
    return { data };
  }

  public static async update(id: string, body: DocumentModal): Promise<{ data: any }> {
    const data = await Modal.findByIdAndUpdate(id, { ...body } as DocumentModal, { new: true, runValidators: true });
    if (!data) throw new NoDataError();
    return { data };
  }

  public static findWorkspaceFileById(id: Schema.Types.ObjectId): Promise<any> {
    const workspaceFile = Modal.aggregate([
      {
        "$match": {
          $expr: {
            $eq: ["$_id", { $toObjectId: id }],
          },
        },
      },
      {
        $lookup: {
          from: FILE_COMMENT_COLLECTION_NAME,
          let: { workspaceId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$file", { $toString: "$$workspaceId" }]
                },
              }
            },
          ],
          as: "comments"
        }
      },
      {
        $project: {
          "_id": 1,
          "name": 1,
          "url": 1,
          "size": 1,
          "type": 1,
          "folder": 1,
          "workspace": 1,
          "comments": { $cond: [{ $eq: ["$comments", []] }, {}, { $first: "$comments" }] }
        },
      },

      {
        $lookup:
        {
          from: USER_COLLECTION_NAME,
          localField: "comments.comments.commentBy",
          foreignField: "_id",
          as: "commentBy"
        }
      },

      {
        $lookup: {
          from: USER_COLLECTION_NAME,
          localField: "comments.comments.reply.answerBy",
          foreignField: "_id",
          as: "replyBy"
        }
      },

      {
        $addFields: {
          "comments.comments": {
            $map: {
              input: "$comments.comments",
              as: "comment",
              in: {
                $mergeObjects: [
                  "$$comment",
                  {
                    commentBy: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$commentBy",
                            cond: {
                              $eq: ["$$this._id", "$$comment.commentBy"]
                            }
                          }
                        },
                        0
                      ]
                    }
                  },
                  {
                    reply: {
                      $map: {
                        input: "$$comment.reply",
                        as: "reply",
                        in: {
                          $mergeObjects: [
                            "$$reply",
                            {
                              answerBy: {
                                $arrayElemAt: [
                                  {
                                    $filter: {
                                      input: "$replyBy",
                                      cond: {
                                        $eq: ["$$this._id", "$$reply.answerBy"]
                                      }
                                    }
                                  },
                                  0
                                ]
                              }
                            }
                          ]
                        }
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      },
      {
        $project: {
          "replyBy": 0,
          "commentBy": 0,
          "comments.comments.commentBy.password": 0,
          "comments.comments.commentBy.role": 0,
          "comments.comments.commentBy.businessQuestionsAnswered": 0,
          "comments.comments.commentBy.business": 0,

          "comments.comments.reply.answerBy.password": 0,
          "comments.comments.reply.answerBy.role": 0,
          "comments.comments.reply.answerBy.businessQuestionsAnswered": 0,
          "comments.comments.reply.answerBy.business": 0,
        },
      },


    ]).exec()

    return workspaceFile
  }


}
