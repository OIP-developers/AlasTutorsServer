import { CreateSalaryFrequencyDTO, GetaAllSalaryFrequencysDTO } from './salaryFrequency.dto';
import { CreateSalaryFrequencyPayloadDTO } from '../../../Interface/payloadInterface/SalaryFrequency';
import { User } from '../../../database/model/User';



export interface ISalaryFrequencyService {

   add(bodyData: CreateSalaryFrequencyPayloadDTO, userData: User) : Promise<CreateSalaryFrequencyDTO>
   getaAllSalaryFrequencys() : Promise<GetaAllSalaryFrequencysDTO[]>


}
