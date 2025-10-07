import { injectable, inject } from 'inversify';
import { JobPostingRepository } from '../../../domain/repositories/job-posting.repository.interface';
import { AppError } from '../../../domain/errors/errors';
import { TYPES } from '../../../infrastructure/di/types';
import { ICompanyRepository } from '../../../domain/repositories';

@injectable()
export class DeleteJobPostingUseCase {
  constructor(
    @inject(TYPES.JobPostingRepository) private jobPostingRepository: JobPostingRepository,
    @inject(TYPES.CompanyRepository) private companyRepository: ICompanyRepository,
  ) {}

  async execute(id: string, userId: string): Promise<void> {
    // Get company profile by user ID
    const companyProfile = await this.companyRepository.getProfileByUserId(userId);
    
    if (!companyProfile) {
      throw new AppError('Company profile not found', 404);
    }

    const existingJob = await this.jobPostingRepository.findById(id);
    
    if (!existingJob) {
      throw new AppError('Job posting not found', 404);
    }

    console.log('DEBUG - Delete Job Authorization:');
    console.log('User ID:', userId);
    console.log('Company Profile ID:', companyProfile.id);
    console.log('Job Company ID:', existingJob.company_id);
    console.log('Match:', existingJob.company_id === companyProfile.id);

    // Use company profile ID for comparison
    if (!existingJob.company_id || existingJob.company_id === '') {
      await this.jobPostingRepository.update(id, { company_id: companyProfile.id } as any);
    } else if (existingJob.company_id !== companyProfile.id) {
      // Check if job was created with user ID instead of company profile ID
      if (existingJob.company_id === userId) {
        console.log('Job has user ID instead of company profile ID, allowing operation...');
        // Don't update here for delete, just allow it to proceed
      } else {
        throw new AppError('Unauthorized to delete this job posting', 403);
      }
    }

    try {
      const deleted = await this.jobPostingRepository.delete(id);
      
      if (!deleted) {
        throw new AppError('Failed to delete job posting', 500);
      }
    } catch (error) {
      throw new AppError('Failed to delete job posting', 500);
    }
  }
}
