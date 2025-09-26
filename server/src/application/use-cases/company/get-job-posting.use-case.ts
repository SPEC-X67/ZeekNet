import { injectable, inject } from 'inversify';
import { JobPostingRepository } from '../../../domain/repositories/job-posting.repository.interface';
import { JobPosting } from '../../../domain/entities/job-posting.entity';
import { AppError } from '../../../domain/errors/errors';
import { TYPES } from '../../../infrastructure/di/types';

@injectable()
export class GetJobPostingUseCase {
  constructor(@inject(TYPES.JobPostingRepository) private jobPostingRepository: JobPostingRepository) {}

  async execute(id: string): Promise<JobPosting> {
    const jobPosting = await this.jobPostingRepository.findById(id);
    
    if (!jobPosting) {
      throw new AppError('Job posting not found', 404);
    }

    return jobPosting;
  }
}
