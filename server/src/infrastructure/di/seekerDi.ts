import { JobPostingRepository } from '../database/mongodb/repositories/job-posting.repository';
import { GetAllJobPostingsUseCase } from '../../application/use-cases/public/get-all-job-postings.use-case';
import { GetJobPostingUseCase } from '../../application/use-cases/company/get-job-posting.use-case';
import { IncrementJobViewCountUseCase } from '../../application/use-cases/company/increment-job-view-count.use-case';
import { SeekerController } from '../../presentation/controllers/seeker/seeker.controller';

const jobPostingRepository = new JobPostingRepository();

const getAllJobPostingsUseCase = new GetAllJobPostingsUseCase(jobPostingRepository);

const getJobPostingUseCase = new GetJobPostingUseCase(jobPostingRepository);

const incrementJobViewCountUseCase = new IncrementJobViewCountUseCase(jobPostingRepository);

const seekerController = new SeekerController(getJobPostingUseCase, getAllJobPostingsUseCase, incrementJobViewCountUseCase);

export { seekerController };
