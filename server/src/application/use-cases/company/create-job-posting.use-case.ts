import { injectable, inject } from 'inversify';
import { JobPostingRepository } from '../../../domain/repositories/job-posting.repository.interface';
import { CreateJobPostingRequestDto } from '../../dto/job-posting/job-posting.dto';
import { JobPosting } from '../../../domain/entities/job-posting.entity';
import { AppError } from '../../../domain/errors/errors';
import { TYPES } from '../../../infrastructure/di/types';
import { JobPostingMapper } from '../../mappers/job-posting.mapper';

@injectable()
export class CreateJobPostingUseCase {
  constructor(
    @inject(TYPES.JobPostingRepository) 
    private jobPostingRepository: JobPostingRepository,
    @inject(TYPES.JobPostingMapper)
    private jobPostingMapper: JobPostingMapper,
  ) {}

  async execute(companyId: string, data: CreateJobPostingRequestDto): Promise<JobPosting> {
    try {
      const jobPostingData = this.jobPostingMapper.toDomain(data, companyId);
      const jobPosting = await this.jobPostingRepository.create(jobPostingData);
      return jobPosting;
    } catch (error) {
      console.error('CreateJobPostingUseCase error:', error);
      if (error instanceof Error) {
        throw new AppError(`Failed to create job posting: ${error.message}`, 500);
      }
      throw new AppError('Failed to create job posting', 500);
    }
  }
}