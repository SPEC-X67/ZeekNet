import { CompanyProfileRepository } from '../database/mongodb/repositories/company-profile.repository';
import { CompanyContactRepository } from '../database/mongodb/repositories/company-contact.repository';
import { CompanyListingRepository } from '../database/mongodb/repositories/company-listing.repository';
import { CompanyVerificationRepository } from '../database/mongodb/repositories/company-verification.repository';
import { CompanyTechStackRepository } from '../database/mongodb/repositories/company-tech-stack.repository';
import { CompanyOfficeLocationRepository } from '../database/mongodb/repositories/company-office-location.repository';
import { CompanyBenefitsRepository } from '../database/mongodb/repositories/company-benefits.repository';
import { CompanyWorkplacePicturesRepository } from '../database/mongodb/repositories/company-workplace-pictures.repository';
import { JobPostingRepository } from '../database/mongodb/repositories/job-posting.repository';
import { S3Service } from '../external-services/s3/s3.service';
import { CreateCompanyProfileUseCase } from '../../application/use-cases/company/create-company-profile.use-case';
import { UpdateCompanyProfileUseCase } from '../../application/use-cases/company/update-company-profile.use-case';
import { GetCompanyProfileUseCase } from '../../application/use-cases/company/get-company-profile.use-case';
import { ReapplyCompanyVerificationUseCase } from '../../application/use-cases/company/reapply-company-verification.use-case';
import { CompanyContactUseCase } from '../../application/use-cases/company/company-contact.use-case';
import { CreateCompanyTechStackUseCase } from '../../application/use-cases/company/create-company-tech-stack.use-case';
import { UpdateCompanyTechStackUseCase } from '../../application/use-cases/company/update-company-tech-stack.use-case';
import { DeleteCompanyTechStackUseCase } from '../../application/use-cases/company/delete-company-tech-stack.use-case';
import { GetCompanyTechStackUseCase } from '../../application/use-cases/company/get-company-tech-stack.use-case';
import { CreateCompanyOfficeLocationUseCase } from '../../application/use-cases/company/create-company-office-location.use-case';
import { UpdateCompanyOfficeLocationUseCase } from '../../application/use-cases/company/update-company-office-location.use-case';
import { DeleteCompanyOfficeLocationUseCase } from '../../application/use-cases/company/delete-company-office-location.use-case';
import { GetCompanyOfficeLocationUseCase } from '../../application/use-cases/company/get-company-office-location.use-case';
import { CreateCompanyBenefitUseCase } from '../../application/use-cases/company/create-company-benefit.use-case';
import { UpdateCompanyBenefitUseCase } from '../../application/use-cases/company/update-company-benefit.use-case';
import { DeleteCompanyBenefitUseCase } from '../../application/use-cases/company/delete-company-benefit.use-case';
import { GetCompanyBenefitUseCase } from '../../application/use-cases/company/get-company-benefit.use-case';
import { CreateCompanyWorkplacePictureUseCase } from '../../application/use-cases/company/create-company-workplace-picture.use-case';
import { UpdateCompanyWorkplacePictureUseCase } from '../../application/use-cases/company/update-company-workplace-picture.use-case';
import { DeleteCompanyWorkplacePictureUseCase } from '../../application/use-cases/company/delete-company-workplace-picture.use-case';
import { GetCompanyWorkplacePictureUseCase } from '../../application/use-cases/company/get-company-workplace-picture.use-case';
import { CreateJobPostingUseCase } from '../../application/use-cases/company/create-job-posting.use-case';
import { GetJobPostingUseCase } from '../../application/use-cases/company/get-job-posting.use-case';
import { GetCompanyJobPostingsUseCase } from '../../application/use-cases/company/get-company-job-postings.use-case';
import { UpdateJobPostingUseCase } from '../../application/use-cases/company/update-job-posting.use-case';
import { DeleteJobPostingUseCase } from '../../application/use-cases/company/delete-job-posting.use-case';
import { IncrementJobViewCountUseCase } from '../../application/use-cases/company/increment-job-view-count.use-case';
import { UpdateJobStatusUseCase } from '../../application/use-cases/company/update-job-status.use-case';
import { CompanyController } from '../../presentation/controllers/company/company.controller';
import { CompanyJobPostingController } from '../../presentation/controllers/company/company-job-posting.controller';

const companyProfileRepository = new CompanyProfileRepository();
const companyContactRepository = new CompanyContactRepository();
const companyListingRepository = new CompanyListingRepository();
const companyVerificationRepository = new CompanyVerificationRepository();
const companyTechStackRepository = new CompanyTechStackRepository();
const companyOfficeLocationRepository = new CompanyOfficeLocationRepository();
const companyBenefitsRepository = new CompanyBenefitsRepository();
const companyWorkplacePicturesRepository = new CompanyWorkplacePicturesRepository();
const jobPostingRepository = new JobPostingRepository();

const s3Service = new S3Service();

const createCompanyProfileUseCase = new CreateCompanyProfileUseCase(companyProfileRepository, companyContactRepository, companyOfficeLocationRepository, companyVerificationRepository);

const updateCompanyProfileUseCase = new UpdateCompanyProfileUseCase(companyProfileRepository);

const getCompanyProfileUseCase = new GetCompanyProfileUseCase(companyProfileRepository, companyContactRepository, companyTechStackRepository, companyOfficeLocationRepository, companyBenefitsRepository, companyWorkplacePicturesRepository);

const reapplyCompanyVerificationUseCase = new ReapplyCompanyVerificationUseCase(companyProfileRepository, companyVerificationRepository);

const companyContactUseCase = new CompanyContactUseCase(companyContactRepository);


const createCompanyTechStackUseCase = new CreateCompanyTechStackUseCase(companyTechStackRepository);
const updateCompanyTechStackUseCase = new UpdateCompanyTechStackUseCase(companyTechStackRepository);
const deleteCompanyTechStackUseCase = new DeleteCompanyTechStackUseCase(companyTechStackRepository);
const getCompanyTechStackUseCase = new GetCompanyTechStackUseCase(companyTechStackRepository);


const createCompanyOfficeLocationUseCase = new CreateCompanyOfficeLocationUseCase(companyOfficeLocationRepository);
const updateCompanyOfficeLocationUseCase = new UpdateCompanyOfficeLocationUseCase(companyOfficeLocationRepository);
const deleteCompanyOfficeLocationUseCase = new DeleteCompanyOfficeLocationUseCase(companyOfficeLocationRepository);
const getCompanyOfficeLocationUseCase = new GetCompanyOfficeLocationUseCase(companyOfficeLocationRepository);


const createCompanyBenefitUseCase = new CreateCompanyBenefitUseCase(companyBenefitsRepository);
const updateCompanyBenefitUseCase = new UpdateCompanyBenefitUseCase(companyBenefitsRepository);
const deleteCompanyBenefitUseCase = new DeleteCompanyBenefitUseCase(companyBenefitsRepository);
const getCompanyBenefitUseCase = new GetCompanyBenefitUseCase(companyBenefitsRepository);


const createCompanyWorkplacePictureUseCase = new CreateCompanyWorkplacePictureUseCase(companyWorkplacePicturesRepository);
const updateCompanyWorkplacePictureUseCase = new UpdateCompanyWorkplacePictureUseCase(companyWorkplacePicturesRepository);
const deleteCompanyWorkplacePictureUseCase = new DeleteCompanyWorkplacePictureUseCase(companyWorkplacePicturesRepository);
const getCompanyWorkplacePictureUseCase = new GetCompanyWorkplacePictureUseCase(companyWorkplacePicturesRepository);

const createJobPostingUseCase = new CreateJobPostingUseCase(jobPostingRepository);

const getJobPostingUseCase = new GetJobPostingUseCase(jobPostingRepository);

const getCompanyJobPostingsUseCase = new GetCompanyJobPostingsUseCase(jobPostingRepository, companyProfileRepository);

const updateJobPostingUseCase = new UpdateJobPostingUseCase(jobPostingRepository);

const deleteJobPostingUseCase = new DeleteJobPostingUseCase(jobPostingRepository, companyProfileRepository);

const incrementJobViewCountUseCase = new IncrementJobViewCountUseCase(jobPostingRepository);

const updateJobStatusUseCase = new UpdateJobStatusUseCase(jobPostingRepository);

const companyController = new CompanyController(
  createCompanyProfileUseCase,
  reapplyCompanyVerificationUseCase,
  updateCompanyProfileUseCase,
  getCompanyProfileUseCase,
  s3Service,
  companyContactUseCase,
  
  createCompanyTechStackUseCase,
  updateCompanyTechStackUseCase,
  deleteCompanyTechStackUseCase,
  getCompanyTechStackUseCase,
  
  createCompanyOfficeLocationUseCase,
  updateCompanyOfficeLocationUseCase,
  deleteCompanyOfficeLocationUseCase,
  getCompanyOfficeLocationUseCase,
  
  createCompanyBenefitUseCase,
  updateCompanyBenefitUseCase,
  deleteCompanyBenefitUseCase,
  getCompanyBenefitUseCase,
  
  createCompanyWorkplacePictureUseCase,
  updateCompanyWorkplacePictureUseCase,
  deleteCompanyWorkplacePictureUseCase,
  getCompanyWorkplacePictureUseCase,
  getCompanyJobPostingsUseCase,
);

const companyJobPostingController = new CompanyJobPostingController(createJobPostingUseCase, getJobPostingUseCase, getCompanyJobPostingsUseCase, updateJobPostingUseCase, deleteJobPostingUseCase, incrementJobViewCountUseCase, updateJobStatusUseCase, companyProfileRepository);

export { companyController, companyJobPostingController, companyProfileRepository, companyProfileRepository as companyRepository, companyListingRepository, companyVerificationRepository };
