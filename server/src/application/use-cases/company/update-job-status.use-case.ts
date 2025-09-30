import { injectable, inject } from 'inversify';
import { JobPostingRepository } from '../../../domain/repositories/job-posting.repository.interface';
import { JobPosting } from '../../../domain/entities/job-posting.entity';
import { AppError } from '../../../domain/errors/errors';
import { TYPES } from '../../../infrastructure/di/types';

@injectable()
export class UpdateJobStatusUseCase {
  constructor(@inject(TYPES.JobPostingRepository) private jobPostingRepository: JobPostingRepository) {}

  async execute(id: string, companyId: string, isActive: boolean): Promise<JobPosting> {
    const existingJob = await this.jobPostingRepository.findById(id);
    
    if (!existingJob) {
      throw new AppError('Job posting not found', 404);
    }

    console.log('UpdateJobStatus - existingJob.company_id:', existingJob.company_id);
    console.log('UpdateJobStatus - companyId:', companyId);
    console.log('UpdateJobStatus - company_id match:', existingJob.company_id === companyId);

    // If company_id is null or empty, update it with the current user's ID
    if (!existingJob.company_id || existingJob.company_id === '') {
      console.log('UpdateJobStatus - company_id is null/empty, updating with current user ID');
      // First update the company_id, then proceed with the normal update
      await this.jobPostingRepository.update(id, { company_id: companyId } as any);
    } else if (existingJob.company_id !== companyId) {
      throw new AppError('Unauthorized to update this job posting', 403);
    }

    try {
      const updatedJob = await this.jobPostingRepository.updateJobStatus(id, isActive ? 'active' : 'inactive');
      
      if (!updatedJob) {
        throw new AppError('Failed to update job status', 500);
      }

      return updatedJob;
    } catch (error) {
      throw new AppError('Failed to update job status', 500);
    }
  }
}
