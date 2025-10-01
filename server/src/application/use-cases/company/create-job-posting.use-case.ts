import { injectable, inject } from 'inversify';
import { JobPostingRepository } from '../../../domain/repositories/job-posting.repository.interface';
import { CreateJobPostingRequestDto } from '../../dto/job-posting/job-posting.dto';
import { AppError } from '../../../domain/errors/errors';
import { TYPES } from '../../../infrastructure/di/types';
import { JobPostingMapper } from '../../mappers/job-posting.mapper';
import { JobPostingResponseDto } from '../../mappers/types';
import { ICompanyRepository } from '../../../domain/repositories';

@injectable()
export class CreateJobPostingUseCase {
  constructor(
    @inject(TYPES.JobPostingRepository) 
    private jobPostingRepository: JobPostingRepository,
    @inject(TYPES.JobPostingMapper)
    private jobPostingMapper: JobPostingMapper,
    @inject(TYPES.CompanyRepository)
    private companyRepository: ICompanyRepository,
  ) {}

  async execute(userId: string, data: CreateJobPostingRequestDto): Promise<JobPostingResponseDto> {
    try {
      // Get company profile by user ID
      const companyProfile = await this.companyRepository.getProfileByUserId(userId);
      
      if (!companyProfile) {
        throw new AppError('Company profile not found', 404);
      }

      const jobPostingData = this.jobPostingMapper.toDomain(data, companyProfile.id);
      const jobPosting = await this.jobPostingRepository.create(jobPostingData);
      return this.jobPostingMapper.toDto(jobPosting);
    } catch (error) {
      console.error('CreateJobPostingUseCase error:', error);
      if (error instanceof Error) {
        throw new AppError(`Failed to create job posting: ${error.message}`, 500);
      }
      throw new AppError('Failed to create job posting', 500);
    }
  }
}