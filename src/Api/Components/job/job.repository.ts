import Job, { JobModel } from './job.entity';
import IJobRepository  from './ijob.repository';
import Repository from '../../../repository/repository';
import { injectable } from 'inversify';
import { Schema } from 'mongoose';
import { JobStatus } from '../../../enums/enums';


@injectable()
export default class JobRepository extends Repository<Job> implements IJobRepository {
  model = JobModel

  getOpenJobs(businessId : Schema.Types.ObjectId) {
    return this.model.find({businessId , status : JobStatus.open}).select("jobTitle")
  }

}
