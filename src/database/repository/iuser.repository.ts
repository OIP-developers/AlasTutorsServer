import IRepository from "../../repository/irepository";
import Keystore from "../model/Keystore";
import User from "../model/User";
import { Types } from 'mongoose';
import Role from '../model/Role';
import { DatabaseId } from "../../../types";

/**
 * User Interface
 */
// @ts-ignore
export default interface IUserRepository
//  extends IRepository<User>
  {
  create(arg0: any, accessTokenKey: any, refreshTokenKey: any, role: any): Promise<any>;

  findUsers(): Promise<User[]>
  find(role: Role , query : any): Promise<User[]>
  findById(id: Types.ObjectId): Promise<User | null>
  findByBusiness(id: Types.ObjectId): Promise<User[] | null>
  findByEmail(email: string): Promise<User | null>
  findByTelegram(telegram_id: string): Promise<User | null>
  findByGoogle(google_id: string, email: string): Promise<User | null>
  findProfileById(id: Types.ObjectId): Promise<User | null>
  findPublicProfileById(id: Types.ObjectId): Promise<User | null>
  createUser( user: User, roleCode: string): Promise<{ user: User }> 
  update( user: User, accessTokenKey: string, refreshTokenKey: string ): Promise<{ user: User; keystore: Keystore }>
  delete(id: Types.ObjectId): Promise<User | null>
  updateInfo(_id: string, user: User): Promise<User | null>
  findByNameAndBusinessId(userName : string, businessId : DatabaseId): Promise<User | null>

}