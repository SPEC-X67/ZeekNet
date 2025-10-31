import { IJobPostingAnalyticsRepository, IJobPostingRepository } from '../../../domain/interfaces/repositories/job/IJobPostingRepository';
import { IGetJobPostingForPublicUseCase } from '../../../domain/interfaces/use-cases/IPublicUseCases';
import { AppError } from '../../../domain/errors/errors';
import { JobPostingDetailResponseDto } from '../../dto/job-posting/job-posting-response.dto';

export class GetJobPostingForPublicUseCase implements IGetJobPostingForPublicUseCase {
  constructor(
    private readonly _jobPostingRepository: IJobPostingRepository,
    private readonly _analyticsRepository: IJobPostingAnalyticsRepository,
  ) {}

  async execute(jobId: string): Promise<JobPostingDetailResponseDto> {
    try {
      if (!jobId || jobId === 'undefined') {
        throw new AppError('Job ID is required', 400);
      }

      const jobPosting = await this._jobPostingRepository.findByIdForClient(jobId);

      if (!jobPosting) {
        throw new AppError('Job posting not found', 404);
      }

      await this._analyticsRepository.incrementViewCount(jobId);

      return jobPosting;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to fetch job posting', 500);
    }
  }
}