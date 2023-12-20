import Job from "./job.entity";
import IRepository from '../../../repository/irepository';
import { Schema } from 'mongoose';

/**
 * Job Interface
 */
export default interface IJobRepository extends IRepository<Job> {

  getOpenJobs(businessId : Schema.Types.ObjectId) : any

}