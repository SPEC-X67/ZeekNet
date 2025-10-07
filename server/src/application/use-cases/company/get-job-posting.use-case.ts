import { IJobPostingRepositoryFull } from '../../../domain/interfaces/repositories';
import { AppError } from '../../../domain/errors/errors';
import { JobPostingMapper } from '../../mappers/job-posting.mapper';
import { JobPostingResponseDto } from '../../mappers/types';

export class GetJobPostingUseCase {
  constructor(
    private readonly _jobPostingRepository: IJobPostingRepositoryFull,
    private readonly _jobPostingMapper: JobPostingMapper,
  ) {}

  async execute(id: string): Promise<JobPostingResponseDto> {
    const jobPosting = await this._jobPostingRepository.findById(id);
    
    if (!jobPosting) {
      throw new AppError('Job posting not found', 404);
    }

    return this._jobPostingMapper.toDto(jobPosting);
  }
}
