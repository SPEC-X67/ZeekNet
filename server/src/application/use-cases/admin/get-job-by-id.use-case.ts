import { injectable, inject } from 'inversify';
import { JobPostingRepository } from '../../../domain/repositories/job-posting.repository.interface';
import { TYPES } from '../../../infrastructure/di/types';
import { AppError } from '../../../domain/errors/errors';
import { JobPostingMapper } from '../../mappers/job-posting.mapper';
import { JobPostingResponseDto } from '../../mappers/types';

@injectable()
export class AdminGetJobByIdUseCase {
  constructor(
    @inject(TYPES.JobPostingRepository) 
    private jobPostingRepository: JobPostingRepository,
    @inject(TYPES.JobPostingMapper)
    private jobPostingMapper: JobPostingMapper,
  ) {}

  async execute(jobId: string): Promise<JobPostingResponseDto> {
    try {
      const job = await this.jobPostingRepository.findById(jobId);
      
      if (!job) {
        throw new AppError('Job not found', 404);
      }

      return this.jobPostingMapper.toDto(job);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to fetch job', 500);
    }
  }
}
