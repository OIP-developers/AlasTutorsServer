import { RoleModel, RoleCode } from "./Role";
export class RoleRepository {

  static async findByCode(code: RoleCode) {
    const role = await RoleModel.findUniqueOrThrow({ where: { code } })
    return role;
  }

  static async findById(id: string) {
    const role = await RoleModel.findUniqueOrThrow({ where: { id } })
    return role;
  }

};

export default RoleRepository;