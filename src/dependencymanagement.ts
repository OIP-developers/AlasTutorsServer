import "reflect-metadata";
import { Container } from "inversify";
import SERVICE_IDENTIFIER from "./identifiers";
import { IJobService } from './Api/Components/job/ijob.service';
import { JobService } from './Api/Components/job/job.service';
import JobRepository from './Api/Components/job/job.repository';
import IJobRepository from './Api/Components/job/ijob.repository';
import { IDataManipulationService } from './Services/interfaces/ijob.service';
import { DataManipulationService } from './Services/implementations/dataManipulation.service';
import { IRecruitmentSkillService } from './Api/Components/recruitmentSkill/irecruitmentSkill.service';
import { RecruitmentSkillService } from './Api/Components/recruitmentSkill/recruitmentSkill.service';
import IRecruitmentSkillRepository from './Api/Components/recruitmentSkill/irecruitmentSkill.repository';
import RecruitmentSkillRepository from './Api/Components/recruitmentSkill/recruitmentSkill.repository';
import { IAccessService } from './Api/Components/access/iaccess.service';
import { AccessService } from './Api/Components/access/access.service';
import IUserRepository from './database/repository/iuser.repository';
import UserRepo from "./database/repository/UserRepo";
import { IJobTypeService } from "./Api/Components/jobType/ijobType.service";
import { JobTypeService } from "./Api/Components/jobType/jobType.service";
import IJobTypeRepository from "./Api/Components/jobType/ijobType.repository";
import JobTypeRepository from './Api/Components/jobType/jobType.repository';
import ISalaryFrequencyRepository from './Api/Components/salaryFrequency/isalaryFrequency.repository';
import { ISalaryFrequencyService } from './Api/Components/salaryFrequency/isalaryFrequency.service';
import { SalaryFrequencyService } from './Api/Components/salaryFrequency/salaryFrequency.service';
import SalaryFrequencyRepository from './Api/Components/salaryFrequency/salaryFrequency.repository';
import { JobApplicationService } from "./Api/Components/jobApplication/jobApplication.service";
import { IJobApplicationService } from "./Api/Components/jobApplication/ijobApplication.service";
import JobApplicationRepository from "./Api/Components/jobApplication/jobApplication.repository";
import IJobApplicationRepository from "./Api/Components/jobApplication/ijobApplication.repository";
import { IScheduleService } from "./Api/Components/schedule/ischedule.service";
import { ScheduleService } from './Api/Components/schedule/shedule.service';
import IScheduleRepository from "./Api/Components/schedule/ischedule.repository";
import ScheduleRepository from "./Api/Components/schedule/schedule.repository";
import { IRecruitmentInterviewService } from "./Api/Components/recruitmentInterview/irecruitmentInterview.service";
import { RecruitmentInterviewService } from "./Api/Components/recruitmentInterview/recruitmentInterview.service";

let container = new Container();

container
    .bind<IJobRepository>(SERVICE_IDENTIFIER.JobRepository)
    .to(JobRepository);


container
    .bind<IJobService>(SERVICE_IDENTIFIER.JobService)
    .to(JobService);
    
    container
    .bind<IDataManipulationService>(SERVICE_IDENTIFIER.DataManipulationService)
    .to(DataManipulationService);
    
    container
    .bind<IRecruitmentSkillService>(SERVICE_IDENTIFIER.RecruitmentSkillService)
    .to(RecruitmentSkillService);
    
    container
    .bind<IRecruitmentSkillRepository>(SERVICE_IDENTIFIER.RecruitmentSkillRepository)
    .to(RecruitmentSkillRepository);
    
    container
        .bind<IAccessService>(SERVICE_IDENTIFIER.AccessService)
        .to(AccessService);

    container
        .bind<IUserRepository>(SERVICE_IDENTIFIER.UserRepository)
        .to(UserRepo);

    container
        .bind<IJobTypeService>(SERVICE_IDENTIFIER.JobTypeService)
        .to(JobTypeService);

    container
        .bind<IJobTypeRepository>(SERVICE_IDENTIFIER.JobTypeRepository)
        .to(JobTypeRepository);
        
        container
        .bind<ISalaryFrequencyService>(SERVICE_IDENTIFIER.SalaryFrequencyService)
        .to(SalaryFrequencyService);
        
        container
        .bind<ISalaryFrequencyRepository>(SERVICE_IDENTIFIER.SalaryFrequencyRepository)
        .to(SalaryFrequencyRepository);
        
        container
            .bind<IJobApplicationService>(SERVICE_IDENTIFIER.JobApplicationService)
            .to(JobApplicationService);
    
        container
            .bind<IJobApplicationRepository>(SERVICE_IDENTIFIER.JobApplicationRepository)
            .to(JobApplicationRepository);

        container
            .bind<IRecruitmentInterviewService>(SERVICE_IDENTIFIER.RecruitmentInterviewService)
            .to(RecruitmentInterviewService);

        container
            .bind<IScheduleService>(SERVICE_IDENTIFIER.ScheduleService)
            .to(ScheduleService);
    
        container
            .bind<IScheduleRepository>(SERVICE_IDENTIFIER.ScheduleRepository)
            .to(ScheduleRepository);

export function resolve<T>(type: symbol): T {
    return container.get<T>(type)
}