import { DataCopier } from "../../../utils/dataCopier";
import { ISalaryFrequencyService } from './isalaryFrequency.service';
import { inject, injectable } from 'inversify';
import User from '../../../database/model/User';
import { BadRequestError, ForbiddenError, NoDataError } from '../../../core/ApiError';
import SERVICE_IDENTIFIER from '../../../identifiers';
import { CreateSalaryFrequencyPayloadDTO } from '../../../Interface/payloadInterface/SalaryFrequency';
import { CreateSalaryFrequencyDTO, GetaAllSalaryFrequencysDTO } from './salaryFrequency.dto';
import ISalaryFrequencyRepository from './isalaryFrequency.repository';
import SalaryFrequency from './salaryFrequency.entity';


@injectable()
export class SalaryFrequencyService implements ISalaryFrequencyService {

  constructor(
    @inject(SERVICE_IDENTIFIER.SalaryFrequencyRepository)
    private salaryFrequencyRepository: ISalaryFrequencyRepository
  ){}


  async add(createSalaryFrequencyDTO: CreateSalaryFrequencyPayloadDTO, userData: User) : Promise<CreateSalaryFrequencyDTO>  {
    let salaryFrequencyData = DataCopier.assignToTarget(createSalaryFrequencyDTO, userData)
    const addsalaryFrequencyData = DataCopier.copy(SalaryFrequency , salaryFrequencyData)
    let result!: CreateSalaryFrequencyDTO
    try {
      result = await this.salaryFrequencyRepository.create(addsalaryFrequencyData)
    } catch (error) {
      throw new BadRequestError('Salary-Frequency cannot be created')
    }
    return result
  }
  
  async getaAllSalaryFrequencys() : Promise<GetaAllSalaryFrequencysDTO[]>  {
    let result!: GetaAllSalaryFrequencysDTO[]
    try {
      const salaryFrequenciesData = await this.salaryFrequencyRepository.find({})
      result = DataCopier.copyArrayOfObjects(GetaAllSalaryFrequencysDTO, salaryFrequenciesData)
    } catch (error) {
      throw new BadRequestError('Salary-Frequency cannot be fetched')
    }
    return result
  }

  
}