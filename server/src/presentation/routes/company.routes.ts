import { Router } from 'express';
import { CompanyController } from '../controllers/company/company.controller';
import { CompanyJobPostingController } from '../controllers/company/company-job-posting.controller';
import {
  authenticateToken,
  authorizeRoles,
} from '../middleware/auth.middleware';
import { uploadSingle } from '../middleware/upload.middleware';
import { validateBody, validateQuery } from '../middleware/validation.middleware';
import { UserBlockedMiddleware } from '../middleware/user-blocked.middleware';
import { 
  CreateJobPostingRequestDto, 
  UpdateJobPostingDto, 
  JobPostingQueryDto, 
} from '../../application/dto/job-posting/job-posting.dto';

export function createCompanyRouter(
  companyController: CompanyController,
  jobPostingController: CompanyJobPostingController,
  userBlockedMiddleware: UserBlockedMiddleware,
): Router {
  const router = Router();
  router.use(authenticateToken);
  router.use(authorizeRoles('company'));
  router.use(userBlockedMiddleware.checkUserBlocked);

  router.post('/profile', companyController.createCompanyProfile);
  router.put('/profile', companyController.updateCompanyProfile);
  router.get('/profile', companyController.getCompanyProfile);
  router.get('/profile/:profileId', companyController.getCompanyProfileById);
  router.get('/dashboard', companyController.getCompanyDashboard);

  router.post('/upload/logo', uploadSingle('logo'), companyController.uploadLogo);
  router.post('/upload/business-license', uploadSingle('business_license'), companyController.uploadBusinessLicense);
  router.delete('/upload/delete', companyController.deleteImage);

  router.post('/jobs', validateBody(CreateJobPostingRequestDto), jobPostingController.createJobPosting);
  router.get('/jobs', validateQuery(JobPostingQueryDto), jobPostingController.getCompanyJobPostings);
  router.get('/jobs/:id', jobPostingController.getJobPosting);
  router.put('/jobs/:id', validateBody(UpdateJobPostingDto), jobPostingController.updateJobPosting);
  router.delete('/jobs/:id', jobPostingController.deleteJobPosting);
  router.patch('/jobs/:id/status', jobPostingController.updateJobStatus);

  return router;
}
