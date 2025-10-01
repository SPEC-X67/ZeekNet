import { injectable, inject } from 'inversify';
import { JobPostingRepository } from '../../../domain/repositories/job-posting.repository.interface';
import { UpdateJobPostingRequestDto } from '../../dto/job-posting/job-posting.dto';
import { AppError } from '../../../domain/errors/errors';
import { TYPES } from '../../../infrastructure/di/types';
import { JobPostingMapper } from '../../mappers/job-posting.mapper';
import { JobPostingResponseDto } from '../../mappers/types';

@injectable()
export class UpdateJobPostingUseCase {
  constructor(
    @inject(TYPES.JobPostingRepository) 
    private jobPostingRepository: JobPostingRepository,
    @inject(TYPES.JobPostingMapper)
    private jobPostingMapper: JobPostingMapper,
  ) {}

  async execute(id: string, companyId: string, data: UpdateJobPostingRequestDto): Promise<JobPostingResponseDto> {
    const existingJob = await this.jobPostingRepository.findById(id);
    
    if (!existingJob) {
      throw new AppError('Job posting not found', 404);
    }

    if (!existingJob.company_id || existingJob.company_id === '') {
      await this.jobPostingRepository.update(id, { company_id: companyId } as any);
    } else if (existingJob.company_id !== companyId) {
      throw new AppError('Unauthorized to update this job posting', 403);
    }

    try {
      const updatedJob = await this.jobPostingRepository.update(id, data);
      
      if (!updatedJob) {
        throw new AppError('Failed to update job posting', 500);
      }

      return this.jobPostingMapper.toDto(updatedJob);
    } catch (error) {
      throw new AppError('Failed to update job posting', 500);
    }
  }
}
