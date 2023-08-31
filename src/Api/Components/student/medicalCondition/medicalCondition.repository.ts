import { BaseRepository } from "../../../../core/common/repository";
import { MedicalConditionModel } from "./MedicalCondition";

export default class MedicalConditionRepository extends BaseRepository<typeof MedicalConditionModel> {

  constructor() {
    super({ model: MedicalConditionModel })
  }

}

export {
  MedicalCondition,
  MedicalConditionWhereQuery,
  MedicalConditionUpdateQuery
} from "./MedicalCondition"

