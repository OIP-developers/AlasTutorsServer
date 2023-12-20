import IJobTypeRepository  from './ijobType.repository';
import Repository from '../../../repository/repository';
import { injectable } from 'inversify';
import JobType from './jobType.entity';
import { JobTypeModel } from './jobType.entity';


@injectable()
export default class JobTypeRepository extends Repository<JobType> implements IJobTypeRepository {
  model = JobTypeModel
}
