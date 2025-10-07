// Company Manual Dependency Injection
import { MongoCompanyRepository } from '../database/mongodb/repositories/company.repository';
import { MongoCompanyContactRepository } from '../database/mongodb/repositories/company-contact.repository';
import { MongoCompanyTechStackRepository } from '../database/mongodb/repositories/company-tech-stack.repository';
import { MongoCompanyOfficeLocationRepository } from '../database/mongodb/repositories/company-office-location.repository';
import { MongoCompanyBenefitsRepository } from '../database/mongodb/repositories/company-benefits.repository';
import { MongoCompanyWorkplacePicturesRepository } from '../database/mongodb/repositories/company-workplace-pictures.repository';
import { MongoCompanyTeamRepository } from '../database/mongodb/repositories/company-team.repository';
import { MongoJobPostingRepository } from '../database/mongodb/repositories/job-posting.repository';
import { S3Service } from '../external-services/s3/s3.service';
import { CompanyProfileMapper } from '../../application/mappers/company-profile.mapper';
import { JobPostingMapper } from '../../application/mappers/job-posting.mapper';

// Use Cases
import { CreateCompanyProfileUseCase } from '../../application/use-cases/company/create-company-profile.use-case';
import { UpdateCompanyProfileUseCase } from '../../application/use-cases/company/update-company-profile.use-case';
import { GetCompanyProfileUseCase } from '../../application/use-cases/company/get-company-profile.use-case';
import { ReapplyCompanyVerificationUseCase } from '../../application/use-cases/company/reapply-company-verification.use-case';
import { CompanyContactUseCase } from '../../application/use-cases/company/company-contact.use-case';
import { CompanyTechStackUseCase } from '../../application/use-cases/company/company-tech-stack.use-case';
import { CompanyOfficeLocationUseCase } from '../../application/use-cases/company/company-office-location.use-case';
import { CompanyBenefitsUseCase } from '../../application/use-cases/company/company-benefits.use-case';
import { CompanyWorkplacePicturesUseCase } from '../../application/use-cases/company/company-workplace-pictures.use-case';
import { CompanyTeamUseCase } from '../../application/use-cases/company/company-team.use-case';
import { CreateJobPostingUseCase } from '../../application/use-cases/company/create-job-posting.use-case';
import { GetJobPostingUseCase } from '../../application/use-cases/company/get-job-posting.use-case';
import { GetCompanyJobPostingsUseCase } from '../../application/use-cases/company/get-company-job-postings.use-case';
import { UpdateJobPostingUseCase } from '../../application/use-cases/company/update-job-posting.use-case';
import { DeleteJobPostingUseCase } from '../../application/use-cases/company/delete-job-posting.use-case';
import { IncrementJobViewCountUseCase } from '../../application/use-cases/company/increment-job-view-count.use-case';
import { UpdateJobStatusUseCase } from '../../application/use-cases/company/update-job-status.use-case';

// Controllers
import { CompanyController } from '../../presentation/controllers/company/company.controller';
import { CompanyJobPostingController } from '../../presentation/controllers/company/company-job-posting.controller';

// Interfaces
import { ICompanyRepository } from '../../domain/interfaces/repositories';

// Create repository instances
const companyRepository = new MongoCompanyRepository() as any;
const companyContactRepository = new MongoCompanyContactRepository() as any;
const companyTechStackRepository = new MongoCompanyTechStackRepository() as any;
const companyOfficeLocationRepository = new MongoCompanyOfficeLocationRepository() as any;
const companyBenefitsRepository = new MongoCompanyBenefitsRepository() as any;
const companyWorkplacePicturesRepository = new MongoCompanyWorkplacePicturesRepository() as any;
const companyTeamRepository = new MongoCompanyTeamRepository() as any;
const jobPostingRepository = new MongoJobPostingRepository() as any;

// Create service instances
const s3Service = new S3Service();

// Create mapper instances
const companyProfileMapper = new CompanyProfileMapper();
const jobPostingMapper = new JobPostingMapper();

// Create use case instances
const createCompanyProfileUseCase = new CreateCompanyProfileUseCase(
  companyRepository ,
  companyProfileMapper
);

const updateCompanyProfileUseCase = new UpdateCompanyProfileUseCase(
  companyRepository ,
  companyProfileMapper
);

const getCompanyProfileUseCase = new GetCompanyProfileUseCase(
  companyRepository ,
  companyContactRepository ,
  companyTechStackRepository ,
  companyOfficeLocationRepository ,
  companyBenefitsRepository ,
  companyWorkplacePicturesRepository ,
  companyTeamRepository );

const reapplyCompanyVerificationUseCase = new ReapplyCompanyVerificationUseCase(
  companyRepository ,
  companyProfileMapper
);

const companyContactUseCase = new CompanyContactUseCase(
  companyContactRepository );

const companyTechStackUseCase = new CompanyTechStackUseCase(
  companyTechStackRepository );

const companyOfficeLocationUseCase = new CompanyOfficeLocationUseCase(
  companyOfficeLocationRepository );

const companyBenefitsUseCase = new CompanyBenefitsUseCase(
  companyBenefitsRepository );

const companyWorkplacePicturesUseCase = new CompanyWorkplacePicturesUseCase(
  companyWorkplacePicturesRepository );

const companyTeamUseCase = new CompanyTeamUseCase(
  companyTeamRepository );

const createJobPostingUseCase = new CreateJobPostingUseCase(
  jobPostingRepository ,
  jobPostingMapper,
  companyRepository );

const getJobPostingUseCase = new GetJobPostingUseCase(
  jobPostingRepository ,
  jobPostingMapper
);

const getCompanyJobPostingsUseCase = new GetCompanyJobPostingsUseCase(
  jobPostingRepository ,
  companyRepository );

const updateJobPostingUseCase = new UpdateJobPostingUseCase(
  jobPostingRepository ,
  jobPostingMapper,
  companyRepository );

const deleteJobPostingUseCase = new DeleteJobPostingUseCase(
  jobPostingRepository ,
  companyRepository );

const incrementJobViewCountUseCase = new IncrementJobViewCountUseCase(
  jobPostingRepository );

const updateJobStatusUseCase = new UpdateJobStatusUseCase(
  jobPostingRepository ,
  jobPostingMapper,
  companyRepository );

// Create controller instances
const companyController = new CompanyController(
  createCompanyProfileUseCase,
  reapplyCompanyVerificationUseCase,
  companyProfileMapper,
  updateCompanyProfileUseCase,
  getCompanyProfileUseCase,
  s3Service,
  companyContactUseCase,
  companyTechStackUseCase,
  companyOfficeLocationUseCase,
  companyBenefitsUseCase,
  companyWorkplacePicturesUseCase,
  companyTeamUseCase,
  getCompanyJobPostingsUseCase
);

const companyJobPostingController = new CompanyJobPostingController(
  createJobPostingUseCase,
  getJobPostingUseCase,
  getCompanyJobPostingsUseCase,
  updateJobPostingUseCase,
  deleteJobPostingUseCase,
  incrementJobViewCountUseCase,
  updateJobStatusUseCase
);

export {
  companyController,
  companyJobPostingController,
  companyRepository };
