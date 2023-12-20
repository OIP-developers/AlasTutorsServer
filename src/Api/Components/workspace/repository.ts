import DocumentModal, { Modal } from './Modal';
import { NoDataError } from '../../../core/ApiError';
import { Schema } from 'mongoose';
import { COLLECTION_NAME as WORKSPACE_FOLDER_COLLECTION_NAME } from './workspaceFolders/workspaceFolder';
import { COLLECTION_NAME as WORKSPACE_FILE_COLLECTION_NAME } from './workspaceFiles/workspaceFile';
import { COLLECTION_NAME as WORKSPACE_FAV_FOLDER_COLLECTION_NAME } from './workspaceFavFolders/workspaceFavFolders';
import { COLLECTION_NAME as WORKSPACE_FAV_FILES_COLLECTION_NAME } from './workspaceFavFiles/workspaceFavFiles';
import { COLLECTION_NAME as FILE_COMMENT_COLLECTION_NAME } from '../../Components/comments/Modal';

export class Repository {

  public static find(): Promise<DocumentModal[]> {
    return Modal
      .find({ isDeleted: false })
      .populate({
        path: "hosts listeners",
        select: "_id first_name profilePicUrl" // select specific fields from hosts and listeners objects
      })
      .select("-isDeleted -updatedAt")
      .lean<DocumentModal[]>()
      .exec();
  }

  public static findById(id: Schema.Types.ObjectId): Promise<DocumentModal> {
    return Modal
      .findById(id, { isDeleted: false })
      .select("-isDeleted -updatedAt")
      .lean<DocumentModal>()
      .exec();
  }

  public static findByIdWithAssets(id: Schema.Types.ObjectId, userId: Schema.Types.ObjectId): Promise<any[]> {

    const workspaceWithAssets = Modal.aggregate([

      {
        "$match": {
          $expr: {
            $eq: ["$_id", { $toObjectId: id }], //Find workspace by ID
          },
        },
      },
      {
        $lookup: {
          from: WORKSPACE_FOLDER_COLLECTION_NAME,
          let: { workspaceId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$workspace", { $toObjectId: "$$workspaceId" }] //Find folders by workspace ID
                },
              },
            },
            //Find if current logged in user has favorited a folder by counting and adding a boolean `isFavoriteByCurrentUser` 
            {
              $lookup: {
                from: WORKSPACE_FAV_FOLDER_COLLECTION_NAME,
                let: { folderId: "$_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ["$folder", { $toObjectId: "$$folderId" }] },
                          { $eq: ["$user", { $toObjectId: userId }] }
                        ]
                      }
                    }
                  }
                ],
                as: "favorites"
              }
            },

            {
              $addFields: {
                isFavoriteByCurrentUser: {
                  $cond: [
                    { $gt: [{ $size: "$favorites" }, 0] },
                    true,
                    false
                  ]
                }
              }
            },

            {
              $lookup: {
                from: WORKSPACE_FILE_COLLECTION_NAME,
                let: { workspaceFolderId: "$_id" },
                pipeline: [
                  { $match: { $expr: { $eq: ['$folder', { $toObjectId: "$$workspaceFolderId" }] } } }, //Find files by folder ID

                  //Find if current logged in user has favorited a file by counting and adding a boolean `isFavoriteByCurrentUser` 
                  {
                    $lookup: {
                      from: WORKSPACE_FAV_FILES_COLLECTION_NAME,
                      let: { fileId: "$_id" },
                      pipeline: [
                        {
                          $match: {
                            $expr: {
                              $and: [
                                { $eq: ["$file", { $toObjectId: "$$fileId" }] },
                                { $eq: ["$user", { $toObjectId: userId }] }
                              ]
                            }
                          }
                        }
                      ],
                      as: "favorites"
                    }
                  },

                  {
                    $addFields: {
                      isFavoriteByCurrentUser: {
                        $cond: [
                          { $gt: [{ $size: "$favorites" }, 0] },
                          true,
                          false
                        ]
                      }
                    }
                  },


                  {
                    $lookup: {
                      from: FILE_COMMENT_COLLECTION_NAME,
                      let: { fileId: "$_id" },
                      pipeline: [
                        { $match: { $expr: { $eq: ['$file', { $toString: "$$fileId" }] } } },
                      ],
                      as: "comments"
                    }
                  },

                  {
                    $addFields: {
                      commentCount: {
                        $size: {
                          $reduce: {
                            input: "$comments",
                            initialValue: [],
                            in: { $concatArrays: ["$$value", "$$this.comments"] }
                          }
                        }
                      }
                    }
                  },

                  { $sort: { isFavoriteByCurrentUser: -1 } }, // Sort by `isFavoriteByCurrentUser`
                  { $project: { "favorites": 0, "comments": 0 } }  // Remove `favorites` field
                ],
                as: "files"
              }
            },

            { $sort: { isFavoriteByCurrentUser: -1 } }, // Sort by `isFavoriteByCurrentUser`

            { $project: { "favorites": 0 } } // Remove `favorites` field

          ],
          as: "folders"
        }
      }
    ]).exec();

    return workspaceWithAssets
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

  public static async update(id: string, body: DocumentModal): Promise<{ data: any }> {
    const data = await Modal.findByIdAndUpdate(id, { ...body } as DocumentModal, { new: true, runValidators: true });
    if (!data) throw new NoDataError();
    return { data };
  }


}
