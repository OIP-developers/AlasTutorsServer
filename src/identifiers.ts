const SERVICE_IDENTIFIER={

    JobService: Symbol.for("IJobService"),
    JobRepository: Symbol.for("IJobRepository"),
    
    RecruitmentSkillService: Symbol.for("IRecruitmentSkillService"),
    RecruitmentSkillRepository: Symbol.for("IRecruitmentSkillRepository"),
    
    DataManipulationService: Symbol.for("IDataManipulationService"),
    
    AccessService: Symbol.for("IAccessService"),
    UserRepository: Symbol.for("IUserRepository"),

    JobTypeService: Symbol.for("IJobTypeService"),
    JobTypeRepository: Symbol.for("IJobTypeRepository"),
    
    SalaryFrequencyService: Symbol.for("ISalaryFrequencyService"),
    SalaryFrequencyRepository: Symbol.for("ISalaryFrequencyRepository"),
    
    JobApplicationService: Symbol.for("IJobApplicationService"),
    JobApplicationRepository: Symbol.for("IJobApplicationRepository"),
    
    
    RecruitmentInterviewService: Symbol.for("IRecruitmentInterviewService"),

    ScheduleService: Symbol.for("IScheduleService"),
    ScheduleRepository: Symbol.for("IScheduleRepository"),
  } 

export default SERVICE_IDENTIFIER;