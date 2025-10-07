import { IJobPostingRepositoryFull } from '../../../domain/interfaces/repositories';
import { UpdateJobPostingRequestDto } from '../../dto/job-posting/job-posting.dto';
import { AppError } from '../../../domain/errors/errors';
import { JobPostingMapper } from '../../mappers/job-posting.mapper';
import { JobPostingResponseDto } from '../../mappers/types';
import { ICompanyRepository } from '../../../domain/interfaces/repositories';

export class UpdateJobPostingUseCase {
  constructor(
    private readonly _jobPostingRepository: IJobPostingRepositoryFull,
    private readonly _jobPostingMapper: JobPostingMapper,
    private readonly _companyRepository: ICompanyRepository,
  ) {}

  async execute(id: string, userId: string, data: UpdateJobPostingRequestDto): Promise<JobPostingResponseDto> {
    // Get company profile by user ID
    const companyProfile = await this._companyRepository.getProfileByUserId(userId);
    
    if (!companyProfile) {
      throw new AppError('Company profile not found', 404);
    }

    const existingJob = await this._jobPostingRepository.findById(id);
    
    if (!existingJob) {
      throw new AppError('Job posting not found', 404);
    }

    console.log('DEBUG - Update Job Authorization:');
    console.log('User ID:', userId);
    console.log('Company Profile ID:', companyProfile.id);
    console.log('Job Company ID:', existingJob.company_id);
    console.log('Match:', existingJob.company_id === companyProfile.id);

    // Use company profile ID for comparison
    if (!existingJob.company_id || existingJob.company_id === '') {
      await this._jobPostingRepository.update(id, { company_id: companyProfile.id } as any);
    } else if (existingJob.company_id !== companyProfile.id) {
      // Check if job was created with user ID instead of company profile ID
      if (existingJob.company_id === userId) {
        console.log('Job has user ID instead of company profile ID, updating...');
        await this._jobPostingRepository.update(id, { company_id: companyProfile.id } as any);
      } else {
        throw new AppError('Unauthorized to update this job posting', 403);
      }
    }

    try {
      const updatedJob = await this._jobPostingRepository.update(id, data);
      
      if (!updatedJob) {
        throw new AppError('Failed to update job posting', 500);
      }

      return this._jobPostingMapper.toDto(updatedJob);
    } catch (error) {
      throw new AppError('Failed to update job posting', 500);
    }
  }
}
