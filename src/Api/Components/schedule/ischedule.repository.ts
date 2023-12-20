import Schedule from "./schedule.entity";
import IRepository from '../../../repository/irepository';
import { Schema } from 'mongoose';

/**
 * Schedule Interface
 */
export default interface IScheduleRepository extends IRepository<Schedule> {


}