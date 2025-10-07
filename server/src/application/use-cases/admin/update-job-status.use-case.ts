import { IJobPostingManagementRepository } from '../../../domain/interfaces/repositories';
import { IAdminUpdateJobStatusUseCase } from '../../../domain/interfaces/use-cases';
import { AppError } from '../../../domain/errors/errors';
import { JobPosting } from '../../../domain/entities/job-posting.entity';

export class AdminUpdateJobStatusUseCase implements IAdminUpdateJobStatusUseCase {
  constructor(
    private readonly _jobPostingRepository: IJobPostingManagementRepository,
  ) {}

  async execute(jobId: string, isActive: boolean): Promise<JobPosting> {
    try {
      const job = await this._jobPostingRepository.findById(jobId);
      
      if (!job) {
        throw new AppError('Job not found', 404);
      }

      const updatedJob = await this._jobPostingRepository.update(jobId, {
        is_active: isActive,
      });

      if (!updatedJob) {
        throw new AppError('Failed to update job status', 500);
      }

      return updatedJob;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to update job status', 500);
    }
  }
}
