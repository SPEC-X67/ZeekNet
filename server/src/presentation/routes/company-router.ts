import { Router } from 'express';
import { companyController, companyJobPostingController } from '../../infrastructure/di/companyDi';
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware';
import { uploadSingle } from '../middleware/upload.middleware';
import { validateBody, validateQuery } from '../middleware/validation.middleware';
import { UserBlockedMiddleware } from '../middleware/user-blocked.middleware';
import { CompanyVerificationMiddleware } from '../middleware/company-verification.middleware';
import { CreateJobPostingRequestDto, UpdateJobPostingDto, JobPostingQueryDto } from '../../application/dto/job-posting/job-posting.dto';
import { SimpleCompanyProfileDto } from '../../application/dto/company';

export class CompanyRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoute();
  }

  private initializeRoute(): void {
    const { companyRepository } = require('../../infrastructure/di/companyDi');
    const { userRepository } = require('../../infrastructure/di/authDi');

    const userBlockedMiddleware = new UserBlockedMiddleware(userRepository, companyRepository);
    const companyVerificationMiddleware = new CompanyVerificationMiddleware(companyRepository);

    this.router.use(authenticateToken);
    this.router.use(authorizeRoles('company'));
    this.router.use(userBlockedMiddleware.checkUserBlocked);

    this.router.post('/profile', companyController.createCompanyProfile);
    this.router.put('/profile', companyController.updateCompanyProfile);
    this.router.get('/profile', companyController.getCompanyProfile);
    this.router.get('/profile/:profileId', companyController.getCompanyProfileById);
    this.router.post('/reapply-verification', validateBody(SimpleCompanyProfileDto), companyController.reapplyVerification);

    this.router.post('/upload/logo', uploadSingle('logo'), companyController.uploadLogo);
    this.router.post('/upload/business-license', uploadSingle('business_license'), companyController.uploadBusinessLicense);
    this.router.delete('/upload/delete', companyController.deleteImage);

    this.router.use(companyVerificationMiddleware.checkCompanyVerified);
    this.router.get('/dashboard', companyController.getCompanyDashboard);

    this.router.get('/contact', companyController.getCompanyContact);
    this.router.put('/contact', companyController.updateCompanyContact);

    this.router.get('/tech-stacks', companyController.getCompanyTechStacks);
    this.router.post('/tech-stacks', companyController.createCompanyTechStack);
    this.router.put('/tech-stacks/:id', companyController.updateCompanyTechStack);
    this.router.delete('/tech-stacks/:id', companyController.deleteCompanyTechStack);

    this.router.get('/office-locations', companyController.getCompanyOfficeLocations);
    this.router.post('/office-locations', companyController.createCompanyOfficeLocation);
    this.router.put('/office-locations/:id', companyController.updateCompanyOfficeLocation);
    this.router.delete('/office-locations/:id', companyController.deleteCompanyOfficeLocation);

    this.router.get('/benefits', companyController.getCompanyBenefits);
    this.router.post('/benefits', companyController.createCompanyBenefit);
    this.router.put('/benefits/:id', companyController.updateCompanyBenefit);
    this.router.delete('/benefits/:id', companyController.deleteCompanyBenefit);

    this.router.get('/workplace-pictures', companyController.getCompanyWorkplacePictures);
    this.router.post('/workplace-pictures', companyController.createCompanyWorkplacePicture);
    this.router.put('/workplace-pictures/:id', companyController.updateCompanyWorkplacePicture);
    this.router.delete('/workplace-pictures/:id', companyController.deleteCompanyWorkplacePicture);
    this.router.post('/workplace-pictures/upload', uploadSingle('image'), companyController.uploadWorkplacePicture);

    this.router.post('/jobs', validateBody(CreateJobPostingRequestDto), companyJobPostingController.createJobPosting);
    this.router.get('/jobs', validateQuery(JobPostingQueryDto), companyJobPostingController.getCompanyJobPostings);
    this.router.get('/jobs/:id', companyJobPostingController.getJobPosting);
    this.router.put('/jobs/:id', validateBody(UpdateJobPostingDto), companyJobPostingController.updateJobPosting);
    this.router.delete('/jobs/:id', companyJobPostingController.deleteJobPosting);
    this.router.patch('/jobs/:id/status', companyJobPostingController.updateJobStatus);
  }
}
