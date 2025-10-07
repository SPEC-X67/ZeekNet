import { IJobPostingRepository } from '../../../domain/interfaces/repositories';
import { IGetJobPostingUseCase } from '../../../domain/interfaces/use-cases';
import { AppError } from '../../../domain/errors/errors';
import { JobPosting } from '../../../domain/entities/job-posting.entity';

export class GetJobPostingUseCase implements IGetJobPostingUseCase {
  constructor(
    private readonly _jobPostingRepository: IJobPostingRepository,
  ) {}

  async execute(jobId: string): Promise<JobPosting> {
    const jobPosting = await this._jobPostingRepository.findById(jobId);
    
    if (!jobPosting) {
      throw new AppError('Job posting not found', 404);
    }

    return jobPosting;
  }
}
