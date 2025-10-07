import { IJobPostingRepositoryFull } from '../../../domain/interfaces/repositories';
import { AppError } from '../../../domain/errors/errors';

export class AdminUpdateJobStatusUseCase {
  constructor(
    private readonly _jobPostingRepository: IJobPostingRepositoryFull
  ) {}

  async execute(jobId: string, isActive: boolean) {
    try {
      const job = await this._jobPostingRepository.findById(jobId);
      
      if (!job) {
        throw new AppError('Job not found', 404);
      }

      const updatedJob = await this._jobPostingRepository.update(jobId, {
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
