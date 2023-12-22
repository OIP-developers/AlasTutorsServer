import User, { UserModel } from '../model/User';
import Role, { RoleModel } from '../model/Role';
import { InternalError } from '../../core/ApiError';
import { Types } from 'mongoose';
import bcrypt from 'bcrypt';
import KeystoreRepo from './KeystoreRepo';
import Keystore from '../model/Keystore';

export const selectString = "+email +password +role +telegram_id +date_of_birth +bio +phone +website +facebook_link +twitter_link +instagram_link +linkedin_link";
export const selectArray = [
  '_id',
  'name',
  'email',
  'first_name',
  'last_name',
  'type',
  'userData',
];

export default class UserRepo {

  public static findUsers(): Promise<User[]> {
    return UserModel.find()
      .select('+email +password +role') // -verified -status
      .populate({
        path: 'role',
        select: "-status"
      })
      .lean<User[]>()
      .exec();
  }

  // contains critical information of the user
  public static find(role: Role, business: string): Promise<User[]> {
    return UserModel.find({ role: { $ne: role._id }, business: business })
      .select('+email +role') // -verified -status
      .populate({
        path: 'role',
        select: "-status"
      })
      .lean<User[]>()
      .exec();
  }

  public static findById(id: Types.ObjectId): Promise<User | null> {
    return UserModel.findOne({ _id: id, status: true })
      .select(selectString)
      .populate({
        path: 'role business',
        select: "-status"
      })
      .lean<User>()
      .exec();
  }

  //need to make this generic for every role
  public static async findByEmail(email: string): Promise<User | null> {
    const result = await UserModel.aggregate([
      {
        $match: {
          email: email,
        }
      },
      {
        $lookup: {
          from: "teacher",
          localField: "_id",
          foreignField: "userId",
          as: "userData",
        },
      },
      { $unwind: "$userData" },
      {
        $addFields: {
          userData: "$userData.data"
        }
      },
    ])

    return result.length ? result[0] : null
  }
  // public static findByEmail(email: string): Promise<User | null> {
  //   return UserModel.findOne({ email: email, status: true })
  //     .select('+email +password')
  //     .lean<User>()
  //     .exec();
  // }

  public static findByTelegram(telegram_id: string): Promise<User | null> {
    return UserModel.findOne({
      // $or: [
      //   { email },
      //   { google_id }
      // ]
      telegram_id, status: true
    })
      .select('+email +password +role +telegram_id')
      .populate({
        path: 'role',
        select: "-status"
      })
      .lean<User>()
      .exec();
  }

  public static findByGoogle(google_id: string, email: string): Promise<User | null> {
    return UserModel.findOne({
      $or: [
        { email },
        { google_id }
      ]
    })
      .select('+email +password +role +google_id')
      .populate({
        path: 'role',
        select: "-status"
      })
      .lean<User>()
      .exec();
  }

  public static findProfileById(id: Types.ObjectId): Promise<User | null> {
    return UserModel.findOne({ _id: id, status: true })
      .select('+role +telegram_id')
      .populate({
        path: 'role',
        select: "-status"
      })
      .lean<User>()
      .exec();
  }

  public static findPublicProfileById(id: Types.ObjectId): Promise<User | null> {
    return UserModel.findOne({ _id: id, status: true }).lean<User>().exec();
  }

  public static async create(
    user: User,
    accessTokenKey: string,
    refreshTokenKey: string,
  ): Promise<{ user: User; keystore: Keystore }> {

    user.password = bcrypt.hashSync(user.password, 10);

    const createdUser = await UserModel.create(user);

    const keystore = await KeystoreRepo.create(createdUser._id, accessTokenKey, refreshTokenKey);

    return { user: createdUser.toObject(), keystore: keystore };

  }

  public static async createUser(
    user: User,
  ): Promise<{ user: User }> {

    user.password = bcrypt.hashSync(user.password, 10);

    const createdUser = await UserModel.create(user);

    return { user: createdUser.toObject() };

  }

  public static async update(
    user: User,
    accessTokenKey: string,
    refreshTokenKey: string,
  ): Promise<{ user: User; keystore: Keystore }> {
    await UserModel.updateOne({ _id: user._id }, { $set: { ...user } })
      .lean()
      .exec();
    const keystore = await KeystoreRepo.create(user._id, accessTokenKey, refreshTokenKey);
    return { user: user, keystore: keystore };
  }

  public static async delete(id: string): Promise<User | null> {
    const user_deleted = await UserModel.findByIdAndDelete(id);
    if (!user_deleted) throw new InternalError('Role must be defined in db!');
    return user_deleted
  }

  public static async updateInfo(_id: string, user: User): Promise<User | null> {
    const user_updated = await UserModel
      .findByIdAndUpdate(_id, { $set: { ...user } }, { new: true, runValidators: true })
      .populate({
        path: 'role',
        select: "-status"
      })
      .lean()
      .exec()
    return user_updated;
  }
}
