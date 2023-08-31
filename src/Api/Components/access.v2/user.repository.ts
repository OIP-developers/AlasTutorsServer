import { BaseRepository } from "../../../core/common/repository";
import User, { UserModel } from "./User";
import { Repository } from "../common/repository";


export default class UserRepository extends BaseRepository<typeof UserModel> {

  constructor() {
    super({ model: UserModel })
  }
  
  public async findStudents(params: { where: any, search?: string, page?: string, limit?: string }) {
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