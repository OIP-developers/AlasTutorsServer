import { CreateJobTypeDTO, GetaAllJobTypesDTO } from './jobType.dto';
import { CreateJobTypePayloadDTO } from '../../../Interface/payloadInterface/JobType';
import { User } from '../../../database/model/User';



export interface IJobTypeService {

   add(bodyData: CreateJobTypePayloadDTO, userData: User) : Promise<CreateJobTypeDTO>
   getaAllJobTypes() : Promise<GetaAllJobTypesDTO[]>


}
