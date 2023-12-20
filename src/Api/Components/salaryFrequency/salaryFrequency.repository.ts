import ISalaryFrequencyRepository  from './isalaryFrequency.repository';
import Repository from '../../../repository/repository';
import { injectable } from 'inversify';
import SalaryFrequency from './salaryFrequency.entity';
import { SalaryFrequencyModel } from './salaryFrequency.entity';


@injectable()
export default class SalaryFrequencyRepository extends Repository<SalaryFrequency> implements ISalaryFrequencyRepository {
  model = SalaryFrequencyModel
}
