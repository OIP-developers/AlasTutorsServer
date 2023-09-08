import { BaseRepository } from "../../../core/common/repository";
import { StudentModel } from "./Student";
import { Repository } from "../common/repository";
export {
  Student,
  StudentWhereQuery,
  StudentUpdateQuery
} from "./Student"

export default class StudentRepository extends BaseRepository<typeof StudentModel> {

  constructor() {
    super({ model: StudentModel })
  }

  public async findStudents(params: { where: any, search?: string, page?: string, limit?: string }) {
    const { where, search, page = "1", limit = "10" } = params;
    const data = await Repository.findMany({
      Model: StudentModel,
      fullTextSearch: ["first_name", "last_name"],
      search,
      page,
      limit,
      where,
      include: {
        medicalCondition: true
      }
    })
    return data
  }


} 