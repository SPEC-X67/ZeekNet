import { injectable, inject } from 'inversify';
import { JobPostingRepository } from '../../../domain/repositories/job-posting.repository.interface';
import { AppError } from '../../../domain/errors/errors';
import { TYPES } from '../../../infrastructure/di/types';

@injectable()
export class DeleteJobPostingUseCase {
  constructor(@inject(TYPES.JobPostingRepository) private jobPostingRepository: JobPostingRepository) {}

  async execute(id: string, companyId: string): Promise<void> {
    const existingJob = await this.jobPostingRepository.findById(id);
    
    if (!existingJob) {
      throw new AppError('Job posting not found', 404);
    }

    if (existingJob.company_id !== companyId) {
      throw new AppError('Unauthorized to delete this job posting', 403);
    }

    try {
      const deleted = await this.jobPostingRepository.delete(id);
      
      if (!deleted) {
        throw new AppError('Failed to delete job posting', 500);
      }
    } catch (error) {
      throw new AppError('Failed to delete job posting', 500);
    }
  }
}
