import Schedule, { ScheduleModel } from './schedule.entity';
import IScheduleRepository  from './ischedule.repository';
import Repository from '../../../repository/repository';
import { injectable } from 'inversify';


@injectable()
export default class ScheduleRepository extends Repository<Schedule> implements IScheduleRepository {
  model = ScheduleModel


}
