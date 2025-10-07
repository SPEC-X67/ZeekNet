// Seeker Manual Dependency Injection
import { MongoJobPostingRepository } from '../database/mongodb/repositories/job-posting.repository';
import { JobPostingMapper } from '../../application/mappers/job-posting.mapper';

// Seeker Use Cases (reusing from company and public modules)
import { GetJobPostingUseCase } from '../../application/use-cases/company/get-job-posting.use-case';
import { GetAllJobPostingsUseCase } from '../../application/use-cases/public/get-all-job-postings.use-case';
import { IncrementJobViewCountUseCase } from '../../application/use-cases/company/increment-job-view-count.use-case';

// Seeker Controller
import { SeekerController } from '../../presentation/controllers/seeker/seeker.controller';

// Create repository instances
const jobPostingRepository = new MongoJobPostingRepository() as any;

// Create mapper instances
const jobPostingMapper = new JobPostingMapper();

// Create use case instances
const getJobPostingUseCase = new GetJobPostingUseCase(
  jobPostingRepository,
  jobPostingMapper
);

const getAllJobPostingsUseCase = new GetAllJobPostingsUseCase(
  jobPostingRepository, // Same instance implements IJobPostingSearchRepository
  jobPostingMapper
);

const incrementJobViewCountUseCase = new IncrementJobViewCountUseCase(
  jobPostingRepository
);

// Create controller instance
const seekerController = new SeekerController(
  getJobPostingUseCase,
  getAllJobPostingsUseCase,
  incrementJobViewCountUseCase
);

export {
  seekerController
};
