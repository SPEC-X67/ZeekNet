import { IJobPostingRepositoryFull } from '../../../domain/interfaces/repositories';
import { CreateJobPostingRequestDto } from '../../dto/job-posting/job-posting.dto';
import { AppError } from '../../../domain/errors/errors';
import { JobPostingMapper } from '../../mappers/job-posting.mapper';
import { JobPostingResponseDto } from '../../mappers/types';
import { ICompanyRepository } from '../../../domain/interfaces/repositories';

export class CreateJobPostingUseCase {
  constructor(
    private readonly _jobPostingRepository: IJobPostingRepositoryFull,
    private readonly _jobPostingMapper: JobPostingMapper,
    private readonly _companyRepository: ICompanyRepository,
  ) {}

  async execute(userId: string, data: CreateJobPostingRequestDto): Promise<JobPostingResponseDto> {
    try {
      // Get company profile by user ID
      const companyProfile = await this._companyRepository.getProfileByUserId(userId);
      
      if (!companyProfile) {
        throw new AppError('Company profile not found', 404);
      }

      const jobPostingData = this._jobPostingMapper.toDomain(data, companyProfile.id);
      const jobPosting = await this._jobPostingRepository.create(jobPostingData);
      return this._jobPostingMapper.toDto(jobPosting);
    } catch (error) {
      console.error('CreateJobPostingUseCase error:', error);
      if (error instanceof Error) {
        throw new AppError(`Failed to create job posting: ${error.message}`, 500);
      }
      throw new AppError('Failed to create job posting', 500);
    }
  }
}