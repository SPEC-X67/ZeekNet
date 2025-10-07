// Public Manual Dependency Injection
import { MongoJobPostingRepository } from '../database/mongodb/repositories/job-posting.repository';
import { JobPostingMapper } from '../../application/mappers/job-posting.mapper';

// Public Use Cases
import { GetAllJobPostingsUseCase } from '../../application/use-cases/public/get-all-job-postings.use-case';
import { GetJobPostingForPublicUseCase } from '../../application/use-cases/public/get-job-posting-for-public.use-case';

// Public Controller
import { PublicJobController } from '../../presentation/controllers/public/public-job.controller';

// Create repository instances
const jobPostingRepository = new MongoJobPostingRepository() as any;

// Create mapper instances
const jobPostingMapper = new JobPostingMapper();

// Create use case instances
const getAllJobPostingsUseCase = new GetAllJobPostingsUseCase(
  jobPostingRepository, // Same instance implements IJobPostingSearchRepository
  jobPostingMapper
);

const getJobPostingForPublicUseCase = new GetJobPostingForPublicUseCase(
  jobPostingRepository, // Same instance implements IJobPostingRepository
  jobPostingMapper
);

// Create controller instance
const publicJobController = new PublicJobController(
  getAllJobPostingsUseCase,
  getJobPostingForPublicUseCase
);

export {
  publicJobController
};
