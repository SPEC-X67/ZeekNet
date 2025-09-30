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
import { SimpleCompanyProfileDto } from '../../application/dto/company';

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

  router.post('/reapply-verification', validateBody(SimpleCompanyProfileDto), companyController.reapplyVerification);
  router.get('/dashboard', companyController.getCompanyDashboard);

  router.post('/upload/logo', uploadSingle('logo'), companyController.uploadLogo);
  router.post('/upload/business-license', uploadSingle('business_license'), companyController.uploadBusinessLicense);
  router.delete('/upload/delete', companyController.deleteImage);

  // Company Contact routes
  router.get('/contact', companyController.getCompanyContact);
  router.put('/contact', companyController.updateCompanyContact);

  // Company Tech Stack routes
  router.get('/tech-stacks', companyController.getCompanyTechStacks);
  router.post('/tech-stacks', companyController.createCompanyTechStack);
  router.put('/tech-stacks/:id', companyController.updateCompanyTechStack);
  router.delete('/tech-stacks/:id', companyController.deleteCompanyTechStack);

  // Company Office Location routes
  router.get('/office-locations', companyController.getCompanyOfficeLocations);
  router.post('/office-locations', companyController.createCompanyOfficeLocation);
  router.put('/office-locations/:id', companyController.updateCompanyOfficeLocation);
  router.delete('/office-locations/:id', companyController.deleteCompanyOfficeLocation);

  // Company Benefits routes
  router.get('/benefits', companyController.getCompanyBenefits);
  router.post('/benefits', companyController.createCompanyBenefit);
  router.put('/benefits/:id', companyController.updateCompanyBenefit);
  router.delete('/benefits/:id', companyController.deleteCompanyBenefit);

  // Company Workplace Pictures routes
  router.get('/workplace-pictures', companyController.getCompanyWorkplacePictures);
  router.post('/workplace-pictures', companyController.createCompanyWorkplacePicture);
  router.put('/workplace-pictures/:id', companyController.updateCompanyWorkplacePicture);
  router.delete('/workplace-pictures/:id', companyController.deleteCompanyWorkplacePicture);
  router.post('/workplace-pictures/upload', uploadSingle('image'), companyController.uploadWorkplacePicture);

  // Company Team routes
  router.get('/team', companyController.getCompanyTeam);
  router.post('/team', companyController.createCompanyTeamMember);
  router.put('/team/:id', companyController.updateCompanyTeamMember);
  router.delete('/team/:id', companyController.deleteCompanyTeamMember);

  router.post('/jobs', validateBody(CreateJobPostingRequestDto), jobPostingController.createJobPosting);
  router.get('/jobs', validateQuery(JobPostingQueryDto), jobPostingController.getCompanyJobPostings);
  router.get('/jobs/:id', jobPostingController.getJobPosting);
  router.put('/jobs/:id', validateBody(UpdateJobPostingDto), jobPostingController.updateJobPosting);
  router.delete('/jobs/:id', jobPostingController.deleteJobPosting);
  router.patch('/jobs/:id/status', jobPostingController.updateJobStatus);

  return router;
}
