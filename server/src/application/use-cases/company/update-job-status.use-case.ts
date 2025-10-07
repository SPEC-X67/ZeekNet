import { IJobPostingManagementRepository } from '../../../domain/interfaces/repositories';
import { IUpdateJobStatusUseCase } from '../../../domain/interfaces/use-cases';
import { AppError } from '../../../domain/errors/errors';
import { JobPosting } from '../../../domain/entities/job-posting.entity';

export class UpdateJobStatusUseCase implements IUpdateJobStatusUseCase {
  constructor(
    private readonly _jobPostingRepository: IJobPostingManagementRepository,
  ) {}

  async execute(jobId: string, isActive: boolean): Promise<JobPosting> {
    const existingJob = await this._jobPostingRepository.findById(jobId);
    
    if (!existingJob) {
      throw new AppError('Job posting not found', 404);
    }

    try {
      const updatedJob = await this._jobPostingRepository.update(jobId, { is_active: isActive });
      
      if (!updatedJob) {
        throw new AppError('Failed to update job status', 500);
      }

      return updatedJob;
    } catch (error) {
      throw new AppError('Failed to update job status', 500);
    }
  }
}
