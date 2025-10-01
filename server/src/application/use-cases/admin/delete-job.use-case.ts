import { injectable, inject } from 'inversify';
import { JobPostingRepository } from '../../../domain/repositories/job-posting.repository.interface';
import { TYPES } from '../../../infrastructure/di/types';
import { AppError } from '../../../domain/errors/errors';

@injectable()
export class AdminDeleteJobUseCase {
  constructor(
    @inject(TYPES.JobPostingRepository) 
    private jobPostingRepository: JobPostingRepository
  ) {}

  async execute(jobId: string) {
    try {
      const job = await this.jobPostingRepository.findById(jobId);
      
      if (!job) {
        throw new AppError('Job not found', 404);
      }

      await this.jobPostingRepository.delete(jobId);

      return { success: true };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to delete job', 500);
    }
  }
}
