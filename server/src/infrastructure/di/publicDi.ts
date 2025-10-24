import { JobPostingRepository } from '../database/mongodb/repositories/job-posting.repository';
import { GetAllJobPostingsUseCase } from '../../application/use-cases/public/get-all-job-postings.use-case';
import { GetJobPostingForPublicUseCase } from '../../application/use-cases/public/get-job-posting-for-public.use-case';
import { PublicJobController } from '../../presentation/controllers/public/public-job.controller';

const jobPostingRepository = new JobPostingRepository();

const getAllJobPostingsUseCase = new GetAllJobPostingsUseCase(jobPostingRepository);

const getJobPostingForPublicUseCase = new GetJobPostingForPublicUseCase(jobPostingRepository);

const publicJobController = new PublicJobController(getAllJobPostingsUseCase, getJobPostingForPublicUseCase);

export { publicJobController };
