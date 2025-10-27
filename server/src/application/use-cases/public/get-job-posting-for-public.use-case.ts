import { IJobPostingRepository } from '../../../domain/interfaces/repositories';
import { IGetJobPostingForPublicUseCase } from '../../../domain/interfaces/use-cases';
import { AppError } from '../../../domain/errors/errors';
import { JobPostingDetailResponseDto } from '../../mappers/types';

export class GetJobPostingForPublicUseCase implements IGetJobPostingForPublicUseCase {
  constructor(private readonly _jobPostingRepository: IJobPostingRepository) {}

  async execute(jobId: string): Promise<JobPostingDetailResponseDto> {
    try {
      if (!jobId || jobId === 'undefined') {
        throw new AppError('Job ID is required', 400);
      }

      const jobPosting = await this._jobPostingRepository.findByIdForClient(jobId);

      if (!jobPosting) {
        throw new AppError('Job posting not found', 404);
      }

      return jobPosting;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to fetch job posting', 500);
    }
  }
}
