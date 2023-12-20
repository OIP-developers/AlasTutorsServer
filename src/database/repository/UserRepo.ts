import User, { INSTRUCTOR_PERMISSION, UserModel } from '../model/User';
import Role, { RoleModel } from '../model/Role';
import { InternalError } from '../../core/ApiError';
import { Types } from 'mongoose';
import bcrypt from 'bcrypt';
import KeystoreRepo from './KeystoreRepo';
import Keystore from '../model/Keystore';
import { injectable } from 'inversify';
import IUserRepository from './iuser.repository';
import Repository from '../../repository/repository';
import { DatabaseId } from '../../../types';

export const selectString = "+email +password +role +telegram_id +date_of_birth +bio +phone +website +facebook_link +twitter_link +instagram_link +linkedin_link";
export const selectArray = [
  '_id',
  'name',
  'role',
  'email',
  'telegram_id',
  'date_of_birth',
  'bio',
  "businessQuestionsAnswered",
  'phone',
  'website',
  'facebook_link',
  'twitter_link',
  'instagram_link',
  'businessQuestionsAnswered',
  'linkedin_link'
];
@injectable()
export default class UserRepo 
// extends Repository<User>
 implements IUserRepository {
  model = UserModel

  findUsers(): Promise<User[]> {
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
   async find(role: Role , query : any): Promise<User[]> {
    const a = await UserModel.find({ role: { $ne: role._id } , ...query })
      .select('+email +role') // -verified -status
      .populate({
        path: 'role',
        select: "-status"
      })
      .lean<User[]>()
      .exec();

      return a
  }

    async findById(id: Types.ObjectId): Promise<User | null> {
    return UserModel.findOne({ _id: id, status: true })
      .select(selectString)
      .populate({
        path: 'role business',
        select: "-status"
      })
      .lean<User>()
      .exec();
  }

  findByBusiness(id: Types.ObjectId): Promise<User[] | null> {
    return UserModel.find({ status: true, business: id, permissions: INSTRUCTOR_PERMISSION })
      .lean<User[]>()
      .exec();
  }

  findByEmail(email: string): Promise<User | null> {
    return UserModel.findOne({ email: email, status: true })
      .select('+email +password +role +telegram_id')
      .populate({
        path: 'role business',
        select: "-status"
      })
      .lean<User>()
      .exec();
  }

  findByTelegram(telegram_id: string): Promise<User | null> {
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

   findByGoogle(google_id: string, email: string): Promise<User | null> {
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

  findProfileById(id: Types.ObjectId): Promise<User | null> {
    return UserModel.findOne({ _id: id, status: true })
      .select('+role +telegram_id')
      .populate({
        path: 'role',
        select: "-status"
      })
      .lean<User>()
      .exec();
  }

  findPublicProfileById(id: Types.ObjectId): Promise<User | null> {
    return UserModel.findOne({ _id: id, status: true }).lean<User>().exec();
  }

  async create(
    user: User,
    accessTokenKey: string,
    refreshTokenKey: string,
    roleCode: string,
  ): Promise<{ user: User; keystore: Keystore }> {
    const now = new Date();

    const role = await RoleModel.findOne({ code: roleCode })
      .select('+email +password +telegram_id')
      .lean<Role>()
      .exec();
    if (!role) throw new InternalError('Role must be defined in db!');

    user.password = user.password ? bcrypt.hashSync(user.password, 10) : null;
    user.role = role._id;
    user.createdAt = user.updatedAt = now;

    const createdUser = await UserModel.create(user);
    createdUser.populate({
      path: 'role',
      select: "-status"
    })

    const keystore = await KeystoreRepo.create(createdUser._id, accessTokenKey, refreshTokenKey);

    return { user: createdUser.toObject(), keystore: keystore };

  }

  async createUser(
    user: User,
    roleCode: string,
  ): Promise<{ user: User }> {
    const now = new Date();

    const role = await RoleModel.findOne({ code: roleCode })
      .select('+email +password +telegram_id')
      .lean<Role>()
      .exec();
    if (!role) throw new InternalError('Role must be defined in db!');

    user.password = user.password ? bcrypt.hashSync(user.password, 10) : null;
    user.role = role._id;
    user.createdAt = user.updatedAt = now;

    const createdUser = await UserModel.create(user);
    createdUser.populate({
      path: 'role',
      select: "-status"
    })

    // const keystore = await KeystoreRepo.create(createdUser._id, accessTokenKey, refreshTokenKey);

    return { user: createdUser.toObject() };

  }

  async update(
    user: User,
    accessTokenKey: string,
    refreshTokenKey: string,
  ): Promise<{ user: User; keystore: Keystore }> {
    user.updatedAt = new Date();
    await UserModel.updateOne({ _id: user._id }, { $set: { ...user } })
      .lean()
      .exec();
    const keystore = await KeystoreRepo.create(user._id, accessTokenKey, refreshTokenKey);
    return { user: user, keystore: keystore };
  }

  async delete(id: Types.ObjectId): Promise<User | null> {
    const user_deleted = await UserModel.findByIdAndDelete(id);
    if (!user_deleted) throw new InternalError('Role must be defined in db!');
    return user_deleted
  }

  async updateInfo(_id: string, user: User): Promise<User | null> {
    user.updatedAt = new Date();
    const user_updated = await UserModel
      .findByIdAndUpdate(_id, { $set: { ...user } }, { new: true, runValidators: true })
      .populate({
        path: 'role',
        select: "-status"
      })
      .lean()
      .exec()
      // @ts-ignore
    return user_updated;
  }

  async findByNameAndBusinessId(userName: string, businessId: DatabaseId): Promise<User | null> {
    // @ts-ignore
    return this.model.find({
      "$expr": {
        "$regexMatch": {
          "input": { "$concat": ["$first_name", " ", "$last_name"] },
          "regex": `${userName}`,  //Your text search here
          "options": "i"
        }
      } 
      , business : businessId
    })
    .select("first_name last_name")
  }
 }