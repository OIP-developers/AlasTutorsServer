import JobApplication, { JobApplicationModel } from './jobApplication.entity';
import IJobApplicationRepository  from './ijobApplication.repository';
import Repository from '../../../repository/repository';
import { injectable } from 'inversify';
import { DatabaseId } from '../../../../types';
import { JobApplicantsDropdownDTO } from '../../../dto/jobApplication.dto';


@injectable()
export default class JobApplicationRepository extends Repository<JobApplication> implements IJobApplicationRepository {
  model = JobApplicationModel

  async getJobApplicantsByJobId( jobId : DatabaseId , businessId : DatabaseId, applicantName : string ) : Promise<JobApplicantsDropdownDTO[]>{
    return this.model.find({jobId, businessId, applicantName : {$regex: applicantName, $options: 'i'} })
    .select("applicantName createdAt")
    .exec()

  }



}
