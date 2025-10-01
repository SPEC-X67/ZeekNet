import { injectable, inject } from 'inversify';
import { JobPostingRepository } from '../../../domain/repositories/job-posting.repository.interface';
import { AppError } from '../../../domain/errors/errors';
import { TYPES } from '../../../infrastructure/di/types';
import { JobPostingMapper } from '../../mappers/job-posting.mapper';
import { JobPostingResponseDto } from '../../mappers/types';

@injectable()
export class GetJobPostingUseCase {
  constructor(
    @inject(TYPES.JobPostingRepository) 
    private jobPostingRepository: JobPostingRepository,
    @inject(TYPES.JobPostingMapper)
    private jobPostingMapper: JobPostingMapper,
  ) {}

  async execute(id: string): Promise<JobPostingResponseDto> {
    const jobPosting = await this.jobPostingRepository.findById(id);
    
    if (!jobPosting) {
      throw new AppError('Job posting not found', 404);
    }

    return this.jobPostingMapper.toDto(jobPosting);
  }
}
