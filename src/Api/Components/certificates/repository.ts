import DocumentModal, { Modal, COLLECTION_NAME as CERTIFICATE_COLLECTION_NAME } from './Modal';
import { NoDataError } from '../../../core/ApiError';
import { Schema } from 'mongoose';
import CertificateModal, { certificateQuizModel, ICertificateQuiz, COLLECTION_NAME as CERTIFICATE_QUIZ_COLLECTION_NAME } from './certificateQuiz';
import ViewsCertificate, { viewsCertificateModel, IViewsCertificate } from './ViewsCertificate';
import AssignedCertificate, { assignedCertificateModel, IAssignedCertificate } from './AssignedCertificate';
import { USER_COLLECTION_NAME } from '../../../database/model/User';
import { COLLECTION_NAME as COURSE_COLLECTION_NAME } from '../module/Course';
import CertificateQuizAnswerModal, { certificateQuizAnswerModel, ICertificateQuizAnswer, COLLECTION_NAME as CERTIFICATE_QUIZ_ANSWER_COLLECTION_NAME } from './certificateQuizAnswer';

export class Repository {

  public static find(): Promise<DocumentModal[]> {
    return Modal
      .find({ isDeleted: false })
      .populate("course")
      .select("-isDeleted -updatedAt")
      .lean<DocumentModal[]>()
      .exec();
  }

  public static findById(id: Schema.Types.ObjectId): Promise<DocumentModal> {
    return Modal
      .findById(id, { isDeleted: false })
      .populate("course")
      .select("-isDeleted -updatedAt")
      .lean<DocumentModal>()
      .exec();
  }

  public static findCertificateByCourse(id: string): Promise<DocumentModal> {
    return Modal
      .findOne({ course: id, isDeleted: false })
      .populate("course")
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

  public static async update(id: string, body: DocumentModal): Promise<{ data: any }> {
    const data = await Modal.findByIdAndUpdate(id, { ...body } as DocumentModal, { new: true, runValidators: true });
    if (!data) throw new NoDataError();
    return { data };
  }

  public static async updateCertificateSurvey(id: string, body: DocumentModal): Promise<{ data: any }> {
    const data = await certificateQuizModel.findByIdAndUpdate(id, { ...body } as DocumentModal, { new: true, runValidators: true });
    if (!data) throw new NoDataError();
    return { data };
  }

  public static async createCertificateSurvey(body: ICertificateQuiz): Promise<{ bucket: CertificateModal }> {
    const bucket = await certificateQuizModel.create({ ...body } as CertificateModal);
    return { bucket };
  }

  public static findByCertificateId(id: Schema.Types.ObjectId): Promise<CertificateModal> {
    return certificateQuizModel
      .findOne({ certificate: id, isDeleted: false })
      .select("-isDeleted -updatedAt")
      .lean<CertificateModal>()
      .exec();
  }

  //View Certificate (Meta table)

  public static async createCertificateView(body: IViewsCertificate): Promise<{ bucket: ViewsCertificate }> {
    const bucket = await viewsCertificateModel.create({ ...body } as ViewsCertificate);
    return { bucket };
  }

  public static findViewByVideo(body: IViewsCertificate): Promise<ViewsCertificate> {
    return viewsCertificateModel
      .findOne({ ...body, isDeleted: false })
      .select("-isDeleted -updatedAt")
      .lean<ViewsCertificate>()
      .exec();
  }

  public static countView(body: IViewsCertificate): Promise<Number> {
    return viewsCertificateModel
      .countDocuments({ ...body })
      .exec();
  }

  //View Certificate (Meta table)

  public static async createAssignCertificate(body: IAssignedCertificate): Promise<{ bucket: AssignedCertificate }> {
    const bucket = await assignedCertificateModel.create({ ...body } as AssignedCertificate);
    return { bucket };
  }

  public static findAssignedCertificate(body: IAssignedCertificate): Promise<AssignedCertificate> {
    return assignedCertificateModel
      .findOne({ ...body, isDeleted: false })
      .select("-isDeleted -updatedAt")
      .lean<AssignedCertificate>()
      .exec();
  }

  public static findAssignedCertificateById(id: Schema.Types.ObjectId): Promise<AssignedCertificate> {
    return assignedCertificateModel
      .findById(id, { isDeleted: false })
      .populate("certificate user")
      .select("-isDeleted -updatedAt")
      .lean<AssignedCertificate>()
      .exec();
  }

  public static async updateAssignCertificate(id: string, body: IAssignedCertificate): Promise<{ data: any }> {
    const data = await assignedCertificateModel.findByIdAndUpdate(id, { ...body } as AssignedCertificate, { new: true, runValidators: true });
    if (!data) throw new NoDataError();
    return { data };
  }


  public static findCertifications(): Promise<AssignedCertificate[]> {

    const assignedCertificates = assignedCertificateModel.aggregate([
      {
        $lookup: {
          from: USER_COLLECTION_NAME,
          let: { userId: "$user" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", { $toObjectId: "$$userId" }]
                },
              },
            },
            { "$project": { "_id": 1, "first_name": 1, "last_name": 1, "email": 1 } }
          ],
          as: "user"
        }
      },

      { $unwind: "$user" },

      {
        $lookup: {
          from: COURSE_COLLECTION_NAME,
          let: { courseId: "$course" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", { $toObjectId: "$$courseId" }]
                },
              }
            },
            { "$project": { "_id": 1, "title": 1, "number_of_lessons": 1 } }
          ],
          as: "course"
        }
      },

      { $unwind: "$course" },

      {
        $project: {
          user: "$user",
          course: "$course",
          status: 1,
          startDate: 1,
          endDate: 1,
          sent: 1,
          _id: 1,
        },
      },
    ]).exec()

    return assignedCertificates

  }

  public static findUserCertifications({ user, status, sent }: { user: Schema.Types.ObjectId, status: string, sent: boolean }): Promise<AssignedCertificate[]> {

    const assignedCertificates = assignedCertificateModel.aggregate([
      {
        "$match": {
          $expr: {
            $eq: ["$user", user]
          },
        }
      },
      {
        "$match": {
          $expr: {
            $eq: ["$status", status]
          },
        }
      },
      {
        "$match": {
          $expr: {
            $eq: ["$sent", sent]
          },
        }
      },

      {
        $lookup: {
          from: USER_COLLECTION_NAME,
          let: { userId: "$user" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", { $toObjectId: "$$userId" }]
                },
              },
            },
            { "$project": { "_id": 1, "first_name": 1, "last_name": 1, "email": 1 } }
          ],
          as: "user"
        }
      },

      { $unwind: "$user" },

      {
        $lookup: {
          from: CERTIFICATE_COLLECTION_NAME,
          let: { certificateId: "$certificate" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", { $toObjectId: "$$certificateId" }]
                },
              }
            },
            { "$project": { "isDeleted": 0, "createdAt": 0, "updatedAt": 0 } }
          ],
          as: "certificate"
        }
      },

      { $unwind: "$certificate" },

      {
        $lookup: {
          from: CERTIFICATE_QUIZ_ANSWER_COLLECTION_NAME,
          let: { quizId: "$certificateQuizAnswer" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ["$_id", "$$quizId"]
                    },
                  ]

                },
              }
            },
          ],
          as: "certificateQuizAnswer"
        }
      },

      {
        $project: {
          user: "$user",
          course: "$course",
          certificate: 1,
          status: 1,
          startDate: 1,
          endDate: 1,
          certificateQuizAnswer: {
            "$switch": {
              "branches": [
                { "case": { "$eq": ["$certificate.require_test", true] }, "then": "$certificateQuizAnswer" },
              ],
              "default": false
            }
          },
          _id: 1,
        },
      },


    ]).exec()

    return assignedCertificates

  }

  public static async createTestAnswer(body: ICertificateQuizAnswer): Promise<{ data: CertificateQuizAnswerModal }> {
    const data = await certificateQuizAnswerModel.create({ ...body } as CertificateQuizAnswerModal);
    return { data };
  }


  public static findUserCertificationById(id: Schema.Types.ObjectId): Promise<any> {

    const assignedCertificatesOne = assignedCertificateModel.aggregate([
      {
        "$match": {
          $expr: {
            $eq: ["$_id", {$toObjectId:id}]
          },
        }
      },

      {
        $lookup: {
          from: USER_COLLECTION_NAME,
          let: { userId: "$user" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", { $toObjectId: "$$userId" }]
                },
              },
            },
            { "$project": { "_id": 1, "first_name": 1, "last_name": 1, "email": 1 } }
          ],
          as: "user"
        }
      },

      { $unwind: "$user" },

      {
        $lookup: {
          from: CERTIFICATE_COLLECTION_NAME,
          let: { certificateId: "$certificate" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", { $toObjectId: "$$certificateId" }]
                },
              }
            },
            { "$project": { "isDeleted": 0, "createdAt": 0, "updatedAt": 0 } }
          ],
          as: "certificate"
        }
      },

      { $unwind: "$certificate" },

      {
        $lookup: {
          from: CERTIFICATE_QUIZ_ANSWER_COLLECTION_NAME,
          let: { quizId: "$certificateQuizAnswer" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ["$_id", "$$quizId"]
                    },
                  ]

                },
              }
            },
          ],
          as: "certificateQuizAnswer"
        }
      },

      {
        $lookup: {
          from: COURSE_COLLECTION_NAME,
          let: { courseId: "$course" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", { $toObjectId: "$$courseId" }]
                },
              }
            },
            { "$project": { "_id": 1, "title": 1, "number_of_lessons": 1 } }
          ],
          as: "course"
        }
      },

      { $unwind: "$course" },
      

      {
        $project: {
          user: "$user",
          course: "$course",
          certificate: 1,
          status: 1,
          startDate: 1,
          endDate: 1,
          certificateQuizAnswer: {
            "$switch": {
              "branches": [
                { "case": { "$eq": ["$certificate.require_test", true] }, "then": "$certificateQuizAnswer" },
              ],
              "default": false
            }
          },
          _id: 1,
        },
      },

      {
        $limit : 1
      }

    ]).exec()

    
    return assignedCertificatesOne
      // .findById(id, { isDeleted: false })
      // .populate("course user certificateQuizAnswer")
      // .select("-isDeleted -updatedAt")
      // .lean<AssignedCertificate>()
      // .exec();
  }


}
