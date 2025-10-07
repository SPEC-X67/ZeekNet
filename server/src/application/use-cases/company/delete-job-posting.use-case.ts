import { IJobPostingRepository, ICompanyProfileRepository } from '../../../domain/interfaces/repositories';
import { AppError } from '../../../domain/errors/errors';

export class DeleteJobPostingUseCase {
  constructor(
    private readonly _jobPostingRepository: IJobPostingRepository,
    private readonly _companyProfileRepository: ICompanyProfileRepository,
  ) {}

  async execute(id: string, userId: string): Promise<void> {
    const companyProfile = await this._companyProfileRepository.getProfileByUserId(userId);
    
    if (!companyProfile) {
      throw new AppError('Company profile not found', 404);
    }

    const existingJob = await this._jobPostingRepository.findById(id);
    
    if (!existingJob) {
      throw new AppError('Job posting not found', 404);
    }

    if (!existingJob.company_id || existingJob.company_id === '') {
      await this._jobPostingRepository.update(id, { company_id: companyProfile.id } as unknown);
    } else if (existingJob.company_id !== companyProfile.id) {
      if (existingJob.company_id !== userId) {
        throw new AppError('Unauthorized to delete this job posting', 403);
      }
    }

    try {
      const deleted = await this._jobPostingRepository.delete(id);
      
      if (!deleted) {
        throw new AppError('Failed to delete job posting', 500);
      }
    } catch (error) {
      throw new AppError('Failed to delete job posting', 500);
    }
  }
}
