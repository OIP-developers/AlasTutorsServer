import mentor, { mentorModel } from "./mentors";
import User, { UserModel } from "../../../database/model/User";

export default class mentorsRepo {
  public static get(): Promise<mentor[]> {
    return mentorModel
      .find({ isDeleted: false })
      .exec()
  }

  public static getOne(mentorUserId: string): Promise<mentor | null> {
    const mentor = mentorModel
      .findOne({ userId: mentorUserId, isDeleted: false })
      .exec()
    return mentor;
  }

  public static async add(body: mentor): Promise<mentor | null> {
    const mentor = await mentorModel.create({ ...body } as mentor)
    return mentor
  }

  // fromUserId: string
  // toUserId: string

  public static async getIncomingMentorshipRequests(mentorUserId: string): Promise<any> {
    const incomingMentorshipRequests = await mentorModel
      .findOne({ userId: mentorUserId, isDeleted: false })
      .exec()
    return incomingMentorshipRequests;
  }

  public static async applyMentorship(
    requestorUserId: string, 
    requestorEmail: string,
    mentorUserId: string
  ): Promise<mentor | null> {
    const mentor = await mentorModel.findOneAndUpdate(
      { userId: mentorUserId },
      {
        $push: {
          incomingMentorshipRequests: [
            {
              userId: requestorUserId,
              email: requestorEmail,
              status: "pending",
            }
          ]
        }
      },
      {
        returnOriginal: false
      })
    return mentor
  }

  public static async ignoreMentorship(
    requestorUserId: string,
    mentorUserId: string,
  ): Promise<mentor | null> {
    const response = await mentorModel.updateOne(
      {
        userId: mentorUserId,
        isDeleted: false,
        "incomingMentorshipRequests.userId": requestorUserId,
      },
      {
        $set: {
          "incomingMentorshipRequests.$.status": "ignored"
        }
      },
      {
        returnOriginal: false
      }
    ).lean().exec();
    const mentor = await mentorModel
      .findOne({ userId: mentorUserId, isDeleted: false })
      .exec()
    return mentor;
  }

  public static async acceptMentorship(
    requestorUserId: string,
    mentorUserId: string,
  ): Promise<mentor | null> {
    const response = await mentorModel.updateOne(
      {
        userId: mentorUserId,
        isDeleted: false,
        "incomingMentorshipRequests.userId": requestorUserId,
      },
      {
        $set: {
          "incomingMentorshipRequests.$.status": "approved"
        }
      },
      {
        returnOriginal: false
      }
    ).lean().exec();
    const mentor = await mentorModel
      .findOne({ userId: mentorUserId, isDeleted: false })
      .exec()
    return mentor
  }
}