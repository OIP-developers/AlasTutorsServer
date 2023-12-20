import JobApplication from "./jobApplication.entity";
import IRepository from '../../../repository/irepository';
import { JobApplicantsDropdownDTO } from '../../../dto/jobApplication.dto';
import { DatabaseId } from "../../../../types";

/**
 * JobApplication Interface
 */
export default interface IJobApplicationRepository extends IRepository<JobApplication> {
  getJobApplicantsByJobId( jobId : DatabaseId , businessId : DatabaseId, applicantName : string ) : Promise<JobApplicantsDropdownDTO[]>

}