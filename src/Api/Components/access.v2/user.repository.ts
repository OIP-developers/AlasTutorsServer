import { UserModel } from "./User";
import { Repository } from "../common/repository";
import { Prisma } from "@prisma/client";


export default class UserRepository {

  static async count() {
    return await UserModel.count();
  }

  static async create(data: Prisma.UserUncheckedCreateInput) {
    return await UserModel.create({ data })
  }

  static async findByEmail(email: string , include: boolean = false) {
    const query = {
      where:{
        email,
      }
    }
    if(include){
      //@ts-ignore
      query.include ={
        address: true,
        emergencyContact: true,
        students: true,
        guardians: true,
        role:true,
      }
    }
    return await UserModel.findUnique(query)
  }

  static async findStudents(params: { where: any, search?: string, page?: string, limit?: string }) {
    const { where, search, page = "1", limit = "10" } = params;
    const data = await Repository.findMany({
      Model: UserModel,
      fullTextSearch: ["first_name", "last_name"],
      search,
      page,
      limit,
      where,
    })
    return data
  }
} 