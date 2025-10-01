import { injectable, inject } from 'inversify';
import { JobPostingRepository } from '../../../domain/repositories/job-posting.repository.interface';
import { TYPES } from '../../../infrastructure/di/types';
import { AppError } from '../../../domain/errors/errors';

@injectable()
export class AdminUpdateJobStatusUseCase {
  constructor(
    @inject(TYPES.JobPostingRepository) 
    private jobPostingRepository: JobPostingRepository
  ) {}

  async execute(jobId: string, isActive: boolean) {
    try {
      const job = await this.jobPostingRepository.findById(jobId);
      
      if (!job) {
        throw new AppError('Job not found', 404);
      }

      const updatedJob = await this.jobPostingRepository.update(jobId, {
        is_active: isActive
      });

      return updatedJob;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to update job status', 500);
    }
  }
}
