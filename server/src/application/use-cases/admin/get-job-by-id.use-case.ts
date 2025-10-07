import { IJobPostingRepositoryFull } from '../../../domain/interfaces/repositories';
import { AppError } from '../../../domain/errors/errors';
import { JobPostingMapper } from '../../mappers/job-posting.mapper';
import { JobPostingResponseDto } from '../../mappers/types';

export class AdminGetJobByIdUseCase {
  constructor(
    private readonly _jobPostingRepository: IJobPostingRepositoryFull,
    private readonly _jobPostingMapper: JobPostingMapper,
  ) {}

  async execute(jobId: string): Promise<JobPostingResponseDto> {
    try {
      const job = await this._jobPostingRepository.findById(jobId);
      
      if (!job) {
        throw new AppError('Job not found', 404);
      }

      return this._jobPostingMapper.toDto(job);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Failed to fetch job', 500);
    }
  }
}
