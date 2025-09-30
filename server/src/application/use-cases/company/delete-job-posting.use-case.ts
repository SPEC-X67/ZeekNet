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

    console.log('DeleteJobPosting - existingJob.company_id:', existingJob.company_id);
    console.log('DeleteJobPosting - companyId:', companyId);
    console.log('DeleteJobPosting - company_id match:', existingJob.company_id === companyId);

    // If company_id is null or empty, update it with the current user's ID
    if (!existingJob.company_id || existingJob.company_id === '') {
      console.log('DeleteJobPosting - company_id is null/empty, updating with current user ID');
      // First update the company_id, then proceed with the deletion
      await this.jobPostingRepository.update(id, { company_id: companyId } as any);
    } else if (existingJob.company_id !== companyId) {
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
