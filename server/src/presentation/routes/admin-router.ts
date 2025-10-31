import { Router } from 'express';
import { adminController, adminJobController, adminJobCategoryController, adminSkillController } from '../../infrastructure/di/adminDi';
import { requireAdmin } from '../middleware/admin.middleware';
import { authenticateToken } from '../middleware/auth.middleware';
import { validateQuery, validateBody } from '../middleware/validation.middleware';
import { GetAllUsersDto, BlockUserDto } from '../../application/dto/admin/user-management.dto';
import { GetAllCompaniesDto, BlockCompanyDto } from '../../application/dto/admin/company-management.dto';
import { AdminGetAllJobsDto } from '../../application/dto/admin/admin-job.dto';
import { GetAllJobCategoriesDto, CreateJobCategoryDto, UpdateJobCategoryDto } from '../../application/dto/admin/job-category.dto';
import { GetAllSkillsDto, CreateSkillDto, UpdateSkillDto } from '../../application/dto/admin/skill-management.dto';

export class AdminRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this._initializeRoutes();
  }

  private _initializeRoutes(): void {
    this.router.use(authenticateToken);
    this.router.use(requireAdmin);

    this.router.get('/users', validateQuery(GetAllUsersDto), adminController.getAllUsers);
    this.router.patch('/users/block', validateBody(BlockUserDto), adminController.blockUser);
    this.router.get('/users/:id', adminController.getUserById);

    this.router.get('/companies', adminController.getAllCompanies);
    this.router.get('/companies/verification', adminController.getPendingCompanies);
    this.router.patch('/companies/verify', adminController.verifyCompany);
    this.router.patch('/companies/block', validateBody(BlockCompanyDto), adminController.blockCompany);

    this.router.get('/jobs', validateQuery(AdminGetAllJobsDto), adminJobController.getAllJobs);
    this.router.get('/jobs/stats', adminJobController.getJobStats);
    this.router.get('/jobs/:id', adminJobController.getJobById);
    this.router.patch('/jobs/:id/status', adminJobController.updateJobStatus);
    this.router.delete('/jobs/:id', adminJobController.deleteJob);

    this.router.get('/job-categories', validateQuery(GetAllJobCategoriesDto), adminJobCategoryController.getAllJobCategories);
    this.router.post('/job-categories', validateBody(CreateJobCategoryDto), adminJobCategoryController.createJobCategory);
    this.router.get('/job-categories/:id', adminJobCategoryController.getJobCategoryById);
    this.router.put('/job-categories/:id', validateBody(UpdateJobCategoryDto), adminJobCategoryController.updateJobCategory);
    this.router.delete('/job-categories/:id', adminJobCategoryController.deleteJobCategory);

    this.router.get('/skills', validateQuery(GetAllSkillsDto), adminSkillController.getAllSkills);
    this.router.post('/skills', validateBody(CreateSkillDto), adminSkillController.createSkill);
    this.router.get('/skills/:id', adminSkillController.getSkillById);
    this.router.put('/skills/:id', validateBody(UpdateSkillDto), adminSkillController.updateSkill);
    this.router.delete('/skills/:id', adminSkillController.deleteSkill);
  }
}