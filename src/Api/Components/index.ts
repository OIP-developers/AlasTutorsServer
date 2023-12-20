import { NextFunction, Request, Response, Router } from 'express';

import { AccessRoutes } from './access/access.routes';
import { AccessAppRoutes } from './access/access.app.routes';
import { AdminSettingnRoutes } from './adminSetting/adminSetting.routes';
import { Routes as BCSanswersRouter } from './BCSanswers/routes'
import { Routes as BrandAuditRouter } from './brandAudit/routes'
import { Routes as CampaignRouter } from './campaign/routes'
import { CategoryRoutes } from './Category/category.routes';
import { Routes as CourseVideoRouter } from './courseVideos/routes'
import { Routes as CulturRouter } from './Cultur/routes'
import { Routes as ModuleRouter } from './module/module.routes'
import { NotFoundError } from '../../core/ApiError';
import { Routes as PossesCardsRouter } from './possesCards/routes'
import { Routes as QuestionsRouter } from './questions/routes'
import { Routes as PostionGoalRouter } from './PostionGoal/routes'
import { QuestionRoutes } from './StrategyQuestions/question.routes';
import { SubCategoryRoutes } from './SubCategory/subCategory.routes';
import { SurveyRoutes } from './survey/survey.routes';
import { courseCategoryRoutes } from './courseCategory/courseCategory.routes';
import { Routes as lifeRouter } from './Life/routes';
import { rewardsRoutes } from './rewards/rewards.route';
import { mentorsRoutes } from './mentors/mentors.route';
import { Routes as workGoalRouter } from './WorkGoals/routes';
import { Routes as SynthesiaAvatarsRouter } from './synthesiaAvatars/synthesia.routes'
import { Routes as SynthesiaLanguageRouter } from './synthesiaLanguages/synthesia.routes'
import { Routes as SynthesiaTemplatesRouter } from './synthesiaTemplates/synthesia.routes'
import { Routes as BusinessRouter } from './business/business.routes'
import { Routes as BusinessQuestionsRouter } from './business/businessQuestions/businessQuestions.routes'
import { Routes as BusinessAnswersRouter } from './business/businessAnswers/businessAnswers.routes'
import { Routes as UserSkillsRouter } from './userSkills/routes'
import { Routes as TaskRoutes } from './task/Task.routes'
import { Routes as DepartmentsGoalRouter } from './departments/routes'
import { Routes as RecommendationRoutes } from './recommendation/Recommendation.routes'
import { Routes as WorkspaceRoutes } from './workspace/routes';
import { Routes as WorkspacesPolls } from './polls/routes';
import { Routes as BrandAssets } from './brandAssets/routes';
import { Routes as Comments } from './comments/routes';
import { Routes as Messages } from './messages/routes';
import { Routes as Agenda } from './agenda/routes';
import { Routes as Contributors } from './contributor/routes';
import { UserCourseRoutes } from './UserCourses/course.routes';
import { FileRoutes } from './Upload/file.routes';
import { Routes as CertificateRoutes } from './certificates/routes';
import { JobRoutes } from './job/job.routes';
import { RecruitmentSkillRoutes } from './recruitmentSkill/recruitmentSkill.routes';
import { JobTypeRoutes } from './jobType/jobType.routes';
import { SalaryFrequencyRoutes } from './salaryFrequency/salaryFrequency.routes';
import { JobApplicationRoutes } from './jobApplication/jobApplication.routes';
import { RecruitmentInterviewRoutes } from './recruitmentInterview/recruitmentInterview.routes';

export const registerApiRoutes = (router: Router, prefix = '', appRoutesPrefix = ''): void => {

  router.get(prefix, (req: Request, res: Response) => res.send('❤'));
  router.use(`${prefix}`, new AccessRoutes().router)
  router.use(`${prefix}/category`, new CategoryRoutes().router)
  router.use(`${prefix}/subcategory`, new SubCategoryRoutes().router)
  router.use(`${prefix}/questions`, new QuestionRoutes().router)
  router.use(`${prefix}/adminsetting`, new AdminSettingnRoutes().router)
  router.use(`${prefix}/survey`, new SurveyRoutes().router)
  router.use(`${prefix}/coursecategory`, new courseCategoryRoutes().router)
  router.use(`${prefix}/workgoal`, new workGoalRouter().router)
  router.use(`${prefix}/life`, new lifeRouter().router)
  router.use(`${prefix}/cultur`, new CulturRouter().router)
  router.use(`${prefix}/skills`, new UserSkillsRouter().router)
  router.use(`${prefix}/postiongoal`, new PostionGoalRouter().router)
  router.use(`${prefix}/bcsanswer`, new BCSanswersRouter().router)
  router.use(`${prefix}/brandaudit`, new BrandAuditRouter().router)
  router.use(`${prefix}/course`, new ModuleRouter().router)
  router.use(`${prefix}/user-course`, new UserCourseRoutes().router)
  router.use(`${prefix}/possescards`, new PossesCardsRouter().router)
  router.use(`${prefix}/employerbrandaudit`, new QuestionsRouter().router)
  router.use(`${prefix}/coursevideo`, new CourseVideoRouter().router)
  router.use(`${prefix}/campaign`, new CampaignRouter().router)
  router.use(`${prefix}/synthesia-avatars`, new SynthesiaAvatarsRouter().router)
  router.use(`${prefix}/synthesia-languages`, new SynthesiaLanguageRouter().router)
  router.use(`${prefix}/synthesia-templates`, new SynthesiaTemplatesRouter().router)
  router.use(`${prefix}/business`, new BusinessRouter().router)
  router.use(`${prefix}/business-questions`, new BusinessQuestionsRouter().router)
  router.use(`${prefix}/business-answers`, new BusinessAnswersRouter().router)
  router.use(`${prefix}/task`, new TaskRoutes().router)
  router.use(`${prefix}/departments`, new DepartmentsGoalRouter().router)
  router.use(`${prefix}/recommendation`, new RecommendationRoutes().router)
  router.use(`${prefix}/file`, new FileRoutes().router)
  router.use(`${prefix}/rewards`, new rewardsRoutes().router)
  router.use(`${prefix}/mentors`, new mentorsRoutes().router)
  router.use(`${prefix}/certificate`, new CertificateRoutes().router)
  router.use(`${prefix}/workspace`, new WorkspaceRoutes().router)
  router.use(`${prefix}/polls`, new WorkspacesPolls().router)
  router.use(`${prefix}/assets`, new BrandAssets().router)
  router.use(`${prefix}/comments`, new Comments().router)
  router.use(`${prefix}/message`, new Messages().router)
  router.use(`${prefix}/agenda`, new Agenda().router)
  router.use(`${prefix}/contributor`, new Contributors().router)
  router.use(`${prefix}/recruitment/job`, new JobRoutes().router)
  router.use(`${prefix}/recruitment/skill`, new RecruitmentSkillRoutes().router)
  router.use(`${prefix}/recruitment/job-type`, new JobTypeRoutes().router)
  router.use(`${prefix}/recruitment/salary-frequency`, new SalaryFrequencyRoutes().router)
  router.use(`${prefix}/recruitment/job-application`, new JobApplicationRoutes().router)
  router.use(`${prefix}/recruitment/interview`, new RecruitmentInterviewRoutes().router)

  // mobile routes starts from here 
  router.use(`${appRoutesPrefix}`, new AccessAppRoutes().router) 
  // mobile routes end here 

  router.use((req: Request, res: Response, next: NextFunction) => next(new NotFoundError()));

}
